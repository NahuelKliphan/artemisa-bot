const Discord = require("discord.js");
const client = new Discord.Client();
var auth = require("./auth.json");
var admin = require("firebase-admin");
var serviceAccount = require("../artemisa-bot-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://artemisa-bot.firebaseio.com/"
});

const db = admin.database();

var usuario = {
    id: null,
    codigo: null,
    nombre: null
};

client.login(auth.Token);

client.on("ready", (evt) => {

    var ref = db.ref("usuario");
    ref.orderByChild("codigo").on("child_added", function (snapshot) {
        usuario = snapshot.val();
        usuario.id = snapshot.key;
        if (usuario.codigo != null) {
            client.user.setPresence({ activity: { name: "compilar con " + usuario.nombre }, status: "online" });
        } else {
            client.user.setPresence({ activity: { name: "compilar libre" }, status: "online" });
        }
        console.log("Listo!");
    });

});

client.on("message", (message) => {
    if (message.content.startsWith("!")) {

        var comando = message.content.split("!")[1].toLowerCase();

        switch (comando) {
            case 'entrar': {
                if (usuario.codigo == null) {
                    usuario.codigo = message.author.id;
                    usuario.nombre = message.author.username;
                    client.user.setPresence({ activity: { name: "compilar con " + usuario.nombre }, status: "online" });
                    message.channel.send("<@" + usuario.codigo + "> entró a artemisa");
                    updateData(usuario);
                } else {
                    if (usuario.codigo != message.author.id) {
                        message.channel.send("Esoy ocupada por <@" + usuario.codigo + "> ");
                    } else {
                        message.channel.send("Ya estas en artemisa. Para salir usa el comando '!salir'");
                    }
                }
                break;
            };
            case 'salir': {
                if (usuario.codigo == null) {
                    message.channel.send("<@" + message.author.id + "> no estabas en artemisa");
                } else {
                    if (usuario.codigo != message.author.id) {
                        message.channel.send("<@" + message.author.id + "> no estabas en artemisa");
                    } else {
                        client.user.setPresence({ activity: { name: "compilar libre" }, status: "online" });
                        message.channel.send("<@" + usuario.codigo + "> salió de artemisa");
                        usuario.codigo = null
                        usuario.nombre = null;
                        updateData(usuario);
                    }
                }
                break;
            };
            case 'alguien': {
                if (usuario.codigo == null) {
                    message.channel.send("Estoy libre");
                } else {
                    message.channel.send("Estoy ocupada por <@" + usuario.codigo + ">");
                }
                break;
            };
            case 'hola artemisa': {
                var saludo = "Hola :wave: me presento. Mi nombre es Artemisa y acepto las siguientes ordenes:";
                saludo += "\n :white_check_mark: !entrar -> Para informarme que entras";
                saludo += "\n :white_check_mark: !salir -> Para informarme que salis";
                saludo += "\n :white_check_mark: !alguien -> Para ver el estado actual";
                message.channel.send(saludo);
                break;
            };
            default: {
                message.channel.send("<@" + message.author.id + "> no te entendí. Usa el comando '!Hola Artemisa' para mas ayuda");
                break;
            };
        }
    }
});

function saveData(usuario) {
    db.ref("usuario").push(usuario);
}

function updateData(usuario) {

    db.ref('usuario/' + usuario.id).set({
        codigo: usuario.codigo,
        nombre: usuario.nombre
    });
}