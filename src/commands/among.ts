import { Client, Message } from "discord.js";
import { Command, random } from "../functions/tools"
const AmongSprite = require('amongsprite'); // uses dependency "canvas"
const { Types } = AmongSprite;


const BGS: string[] = Object.values(Types.BG)
const HATS: string[] = Object.values(Types.HATS)
const OUTFITS: string[] = Object.values(Types.OUTFITS)
const PETS: string[] = Object.values(Types.PETS)

export const command: Command = {
    name: "among",
    description: "Generates a custom among us, just for you!\n`=>among`",
    execute: async function (msg: Message, args: string[], bot: Client) {
        const canvas = await AmongSprite.create(
            900, '#D6C9BD',
            BGS[ random(BGS.length) ], 
            HATS[ random(HATS.length) ], 
            OUTFITS[ random(OUTFITS.length) ], 
            PETS[ random(PETS.length) ]
        )
        const buffer = await canvas.toBuffer()

        await msg.reply({content: `Here's your NFT Among Us #${random(BGS.length * HATS.length * OUTFITS.length * PETS.length)}`, files: [
                { attachment: buffer }
            ]}
        )

    }
}