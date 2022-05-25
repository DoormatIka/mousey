import { env } from "../config.json"
import { Command } from "../functions/tools"
import { Client, Message, MessageEmbed } from "discord.js"
const sagiri = require('sagiri');
const client = sagiri(env.saucenao, { results: 5 });

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