const Discord = require("discord.js");
const client = new Discord.Client();
var auth = require("./auth.json");

var usuarioEnArtemisa = null;
var nombreUsuarioEnArtemisa = "";

client.on("ready", (evt) => {
    console.log("Listo!");
    client.user.setPresence({ activity: { name: "compilar libre" }, status: "online" });
});

client.on("message", (message) => {
    if (message.content.startsWith("!")) {
        var comando = message.content.split("!")[1];
        message.delete();
        switch (comando) {
            case 'entrar': {
                if (usuarioEnArtemisa == null) {
                    usuarioEnArtemisa = message.author.id;
                    nombreUsuarioEnArtemisa = message.author.username;
                    client.user.setPresence({ activity: { name: "compilar con " + nombreUsuarioEnArtemisa }, status: "online" });
                    message.channel.send("<@" + usuarioEnArtemisa + "> entró a artemisa");
                    //Poner reaccion copada
                } else {
                    if (usuarioEnArtemisa != message.author.id) {
                        //Poner reaccion mala
                        message.channel.send("Artemisa está ocupada por <@" + usuarioEnArtemisa + "> ");
                    } else {
                        message.channel.send("Ya estas en artemisa. Para salir usa el comando '!salir'");
                        //Poner reaccion info
                    }
                }
                break;
            };
            case 'salir': {
                if (usuarioEnArtemisa == null) {
                    message.channel.send("<@" + message.author.id + "> nunca estuviste en artemisa");
                    //Poner reaccion info
                } else {
                    if (usuarioEnArtemisa != message.author.id) {
                        message.channel.send("<@" + message.author.id + "> nunca estuviste en artemisa");
                        //Poner reaccion info
                    } else {
                        client.user.setPresence({ activity: { name: "compilar libre" }, status: "online" });
                        message.channel.send("<@" + usuarioEnArtemisa + "> salió de artemisa");
                        usuarioEnArtemisa = null
                        nombreUsuarioEnArtemisa = "";
                        //Poner reaccion copada
                    }
                }
                break;
            };
            case 'alguien': {
                if (usuarioEnArtemisa == null) {
                    message.channel.send("Artemisa libre");
                } else {
                    message.channel.send("Artemisa esta ocupado por <@" + usuarioEnArtemisa + ">");
                }
                break;
            };
            case 'Hola Artemisa': {
                var saludo = "Hola :wave: me presento. Mi nombre es Artemisa y acepto las siguientes ordenes:";
                saludo += "\n :white_check_mark: !entrar -> Para informarme que entras";
                saludo += "\n :white_check_mark: !salir -> Para informarme que salis";
                saludo += "\n :white_check_mark: !alguien -> Para ver el estado actual";
                message.channel.send(saludo);
                break;
            };
            case 'Quien te creo?': {
                var saludo = "El mas kapo de Charly";
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
client.login(auth.Token);