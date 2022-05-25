import { Command } from "../functions/tools"
import { Client, Message } from "discord.js"

export const command: Command = {
    name: "commandname",
    description: "description",
    execute: function (msg: Message, args: string[], bot: Client) {
        
    }
}