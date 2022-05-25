import { Client, Message } from "discord.js";
import { Command } from "../functions/tools"

export const command: Command = {
    name: "ping",
    description: "pings you.\n`=>ping`",
    execute: function (msg: Message, args: string[], bot: Client) {
        msg.channel.send(`${msg.author}, Pong!!!`);
    }
}