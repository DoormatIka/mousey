import { Command } from "../functions/tools"
import { Client, Message } from "discord.js"
const NSFAI = require('nsfai');
const nsfai = new NSFAI("2b11bb4c781943b5b39c3f62f482eebe");


export const command: Command = {
    name: "nsfw",
    description: "NSFW filter. `=>nsfw [enable/disable]`\nDefault: disable",
    execute: async function (msg: Message, args: string[], bot: Client) {
        if (args.length == 0) return msg.reply("Set NSFW filter to enable or disable.");

        // Objective:
        // Make an NSFW filter server-wide

        // Making a database with the server option
        /*
            {
                'serverid': {
                    'nsfw': false
                }
            }
        */

        // https://www.npmjs.com/package/nsfai
        // https://portal.clarifai.com/users/lilyn_0_1764/apps/c818d413bc984dba8e76ec39c72fb5f8
        // 6/30/2022 11:deez nuts PM
    }
}