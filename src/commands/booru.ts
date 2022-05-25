import { Command } from "../functions/tools"
import { search } from 'booru'
import Post from "booru/dist/structures/Post"
import { Client } from "discord.js";


export const command: Command = {
    name: "booru",
    description: "Gets gelbooru results with tags.\n`=>booru [tags]`",
    execute: function (msg: any, args: string[], bot: Client) {
        if(!msg.channel.nsfw) return msg.channel.send('...Go to an NSFW Channel.')
        if (args.length == 0) return msg.channel.send('Provide a tag.')

        let results: string = "";

        search('gelbooru', args, { limit: 5, random: true })
            .then((posts: Post[]) => {
                if (posts.length == 0) msg.reply(`Nothing found.`)

                for (let post of posts) {
                    results += `${post.fileUrl}\n`;
                }

                msg.reply(`Here you go: ${results}`)
            })
            .catch((err) => {
                msg.reply(`Error: ${err}`)
            })
        
    }
}