import { Command } from "../functions/tools"
import { Client, Message } from "discord.js"

const Cryptr = require('cryptr');
const cryptr = new Cryptr("rhv8nehsi8thn98ahrnc9ohc289");

export const command: Command = {
    name: "crypt",
    description: "Encrypts and Decrypts your given message.\n`=>crypt [encrypt|decrypt] [string]`",
    execute: function (msg: Message, args: string[], bot: Client) {
        if (!(args.length > 1)) return msg.reply("Did you provide something to encrypt?")
        
        let args_duplicate: string[] = [];

        Array.prototype.push.apply(args_duplicate, args); // copy array wahaah
        args_duplicate.shift();
        const str = args_duplicate.join(" ");
        

        switch (args[0]) {
            case "encrypt":
                return msg.reply( cryptr.encrypt(str) )
            case "decrypt":
                return msg.reply( cryptr.decrypt(str) )
            default:
                return msg.reply( "...This is impossible." )
        }
    }
}