import { Command } from "../functions/tools"
import { Client, Message, MessageEmbed } from "discord.js"
const sagiri = require('sagiri');
const client = sagiri('6adaebd1f82d5a47efaa57d4347bbc7a71b45cf8', { results: 5 });

export const command: Command = {
    name: "sauce",
    description: "SauceNAO image search\n`=>sauce [attachment]`",
    execute: async function (msg: Message, args: string[], bot: Client) {
        if (!msg.attachments.first()) return msg.reply("Is there an image here?")


        const results = await client(msg.attachments.first()?.url);

        const sauceEmbed: MessageEmbed = new MessageEmbed()
            .setTitle("Sauce found?")
        
        for (let i = 0; i < results.length; i++) {
            sauceEmbed.addField(
                `${results[i].site}: ${results[i].authorName} (${results[i].similarity})`,
                `Sauce: ${results[i].url}\nArtist: ${results[i].authorUrl}`
            )
        }

        msg.reply({embeds: [sauceEmbed]})
    }
}