import { Message, MessageEmbed } from "discord.js";
import { Command, randomResponse } from "../functions/tools"


export const command: Command = {
    name: "av",
    description: "Gets your avatar.\n`=>av [mention?]`",
    execute: function (msg: Message) {
        const mentioned = msg.mentions.members?.first();
        const avEmbed: MessageEmbed = new MessageEmbed()

        const extraMessage: string = randomResponse([
            "What a nice profile picture.",
            "The profile picture is decent, I guess.",
            "Is that an anime profile picture?"
        ])


        if (!mentioned) {
            avEmbed.setTitle(`${msg.author.username}, here's your avatar.`)
            avEmbed.setFooter({text: extraMessage})
            avEmbed.setImage( `${ msg.author.avatarURL({size: 1024, dynamic: true}) }` )
            avEmbed.setColor("#F185FF")
        } else {
            avEmbed.setTitle(`${msg.author.username}, here's ${mentioned.user.username} avatar.`)
            avEmbed.setFooter({text: extraMessage})
            avEmbed.setImage( `${ mentioned.user.avatarURL({size: 1024, dynamic: true}) }` )
            avEmbed.setColor("#F185FF")
        }

        msg.reply({embeds: [avEmbed]});
    }
}