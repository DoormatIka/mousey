import { Intents, Client, Collection, Message } from "discord.js"
import * as fs from "fs"

import { env } from "./config.json";


const commands: any = new Collection();


export const bot: Client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

bot.on("ready", async () => {
    bot.user?.setActivity("=>help", {
        type: "PLAYING",
    })

    await bot.guilds.fetch();
    console.log(`Logged in as ${bot.user!.tag}.`);
});

bot.on("messageCreate", async (msg: Message) => {

    if (msg.author.bot) return;

    if (!msg.content.startsWith(env.prefix)) return;

    const args: string[] = msg.content.slice(env.prefix.length).split(/ +/);
    const cmmd: string = args.shift()!.toLowerCase();
    
    try {
        const command_object = commands.get(cmmd)
        if (command_object.name == "help") { // help command
            command_object.execute(msg, commands)
        } else {
            command_object.execute(msg, args, bot)
        }
    } catch (error) {
        msg.reply(`Wrong command. ${error}`)
    }
})


async function run() { // runs once
    if (!env.token) {
        throw Error("Could not find the token.")
    }
    commandFilesSet("./src/commands/", "./commands/")

    await bot.login(env.token);
}

function commandFilesSet(filepath_finder: string, filepath_require: string) {
    const commandFiles = fs.readdirSync(filepath_finder).filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {
            const cmmd = require(`${filepath_require}${file}`).command
            commands.set(cmmd.name, cmmd)

            console.log(`${filepath_require}${file}`)
        }
}

run();