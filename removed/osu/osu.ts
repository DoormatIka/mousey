import { request } from "../api_request"
import { Command } from "../../src/functions/tools"
import { MessageEmbed } from "discord.js"

export const command: Command = {
    name: "osu",
    description: "Gets osu! profile.",
    execute: async function (msg: any, args: string[]) {
        if (args == []) return;

        try {
            const osu_user_data = await get_osu_data(args[0]);
            const osuEmbed = format_osu_data(osu_user_data);

            await msg.reply({ embeds: [osuEmbed] });
        } catch (error: any) {
            msg.reply(`${error}`);
        }
    }
}


async function get_osu_data(user: string) {
    const osu_data = await request(`/users/${user}/osu`);
    return osu_data;
}

function format_osu_data(data: any) {
    const osuEmbed: MessageEmbed = new MessageEmbed()
            .setTitle(data.username)
            .setThumbnail(data.avatar_url)
            .setFields(
                { name: "global rank", value: `#${data.statistics.global_rank}` },
                { name: "country rank", value: `#${data.statistics.country_rank}` },
                { name: "level", value: `${data.statistics.level.current}` },
                { name: "pp", value: `${data.statistics.pp}` },
            )
    return osuEmbed;
}