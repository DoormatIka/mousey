import { MessageEmbed } from "discord.js";
import { Command } from "../functions/tools"

export const command: Command = {
    name: "help",
    description: "Helps you.",
    execute: function (msg: any, commands: any) {
        const cmmds: any = Array.from(commands.values());
        
        const helpEmbed: MessageEmbed = new MessageEmbed()
            .setTitle("Here's the commands!")
        
        for (let cmmd of cmmds) {
            helpEmbed.addField(cmmd.name, cmmd.description)
        }

        msg.reply({embeds: [helpEmbed]})
    }
}