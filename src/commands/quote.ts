import StormDB from "stormdb";

import { set_database, get_database } from "../functions/db";

import { Command } from "../functions/tools"
import { Client, Message } from "discord.js"

const engine = new StormDB.localFileEngine("./src/general.stormdb");
const db = new StormDB(engine);
db.default({ users: [], server: [] })


export const command: Command = {
    name: "quote",
    description: "Quotes someone.\n Set quote: `=>quote [messageID]`\n Get quote: `=>quote @mentioned`\n Get your own quote: `=>quote`",
    execute: async function (msg: Message, args: string[], bot: Client) {
        const mentioned = msg.mentions.members?.first()
        let quote;

        if (args.length == 0) {
            quote = get_database(db, msg.author.id);

            if (quote.length != 0) {
                return msg.reply(`${msg.author.username}: ${quote[0].attributes.quote}`)
            } else {
                return msg.reply(`No quotes found for this user.`)
            }
        }

        
        if (mentioned) {
            quote = get_database(db, mentioned.id)

            if (quote.length != 0) {
                msg.reply(`${mentioned.user.username}: ${quote[0].attributes.quote}`)
            } else {
                msg.reply(`No quotes found for this user.`)
            }
        } else {
            try {
                await add_database(db, msg, args)
            } catch (err) {
                msg.reply(`Invalid message ID, probably. ${err}`)
            }
        }

    }
}

async function add_database(db: StormDB, msg: Message, args: string[]) {
    const message = await msg.channel.messages.fetch(args[0])

    set_database(db, message.author.id, "quote", message.content)

    msg.reply(`Quote saved as \`${message.content}\` by \`${msg.author.username}\``)
}