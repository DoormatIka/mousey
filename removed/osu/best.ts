import { request } from "../api_request"
import { Command } from "../../src/functions/tools"
import { MessageEmbed } from "discord.js"

const numberChecker: RegExp = /[1234567890]/g

export const command: Command = {
    name: "best",
    description: "Gets your best osu! scores.",

    execute: async function (msg: any, args: string[]) {
        if (args == []) return;
        if (!numberChecker.test(args[0])) return;

        const userID = args[0]
        const limit = args[1]

        try {
            const data: any = await get_osu_user_beatmap_data(userID, "best", limit);
            const beatmapEmbed: MessageEmbed = format_osu_user_beatmap_data(data, limit);

            await msg.reply({embeds: [beatmapEmbed]});
        } catch (err) {
            await msg.reply(`UserID needed. ${err}`);
            // console.log(err);
        }
    }
}

async function get_osu_user_beatmap_data(userID: string, type: string, limit: string = "3") {
    const osu_beatmap_data: any = await request(`/users/${userID}/scores/${type}`, {
        "mode": "osu",
        "limit": limit
    });
    return osu_beatmap_data
} // get_osu_beatmap_data("18682614", "recent");

function format_osu_user_beatmap_data(data: any, limit: string) {
    const int_limit: number = parseInt(limit);
    const failEmbed: MessageEmbed = new MessageEmbed();

    if (int_limit === 0 || int_limit == NaN) {
        failEmbed.setTitle("Error!")
        failEmbed.setDescription("Did you give me a bad best play count?")
        return failEmbed;
    }
    if (int_limit > 25) {
        failEmbed.setTitle("Too much.. data..")
        failEmbed.setDescription("You gave me too much best play count.")
        return failEmbed
    }


    const beatmapEmbed: MessageEmbed = new MessageEmbed()
        .setAuthor({ name: `${data[0].user.username} [${data[0].user.country_code}]`, iconURL: `${data[0].user.avatar_url}` })
        .setTitle(`Best plays for ${data[0].user.username}`)
    
    for (let i = 0; i < int_limit; i++) {
        beatmapEmbed.addField(
            `${i+1}. ${data[i].beatmapset.title} [${data[i].beatmap.difficulty_rating}*]`,
            `${Math.round( (data[i].accuracy * 100) * 10 ) / 10}% [${data[i].rank}] : pp: ${data[i].pp}` 
        )
    }
    
    return beatmapEmbed;
}