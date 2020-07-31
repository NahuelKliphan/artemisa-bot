const Discord = require("discord.js");
const client = new Discord.Client();
var auth = require("./auth.json");

var usuarioEnArtemisa = null;

client.on("ready", (evt) => {
    console.log("Listo!");
});

client.on("message", (message) => {

    if (message.content.startsWith("!")) {

        var comando = message.content.split("!")[1];
        switch (comando) {
            case 'entrar': {
                if (usuarioEnArtemisa == null) {

                    usuarioEnArtemisa = message.author.id;
                    //Cambiar de estado
                    //Poner reaccion copada

                    message.channel.send("<@" + usuarioEnArtemisa + "> entro a artemisa");

                }else{

                    if(usuarioEnArtemisa != message.author.id){
                        //Poner reaccion mala
                        message.channel.send("Artemisa está ocupada por <@" + usuarioEnArtemisa + "> ");
                    }else{
                        //Poner reaccion info
                        message.channel.send("Ya estas en artemisa. Para salir usa el comando '!salir'");
                    }

                }
                break;
            };
            case 'salir': {
                if (usuarioEnArtemisa == null) {

                    //Poner reaccion info
                    message.channel.send("Nunca estuviste en artemisa");

                } else {

                    if(usuarioEnArtemisa != message.author.id){

                        //Poner reaccion info
                        message.channel.send("Nunca estuviste en artemisa");

                    }else{

                        //Cambiar de estado
                        usuarioEnArtemisa = null
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
            case 'quien te creo?': {

                var saludo = "Charly pa";
                message.channel.send(saludo);
                break;
            };

            default: {

                message.channel.send("<@" + message.author.id + "> no te entendí amigo");
                break;
            };

        }
    }
});
client.login(auth.Token);