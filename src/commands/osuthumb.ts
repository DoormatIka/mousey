import { Command } from "../functions/tools"
import { Client, Message } from "discord.js"
import { combineImages, Text } from "../functions/canvas";

const matching: RegExp = /(?<=\[).+?(?=\])/g;

export const command: Command = {
    name: "osuthumb",
    description: "Makes an osu! thumbnail!\n\m`=>osuthumb [playername] [title] [diffname] [accuracy%] [combox] [mods] [bglink] [dark value?]`\nBRACKETS INCLUDED! 1280x720 images recommended.",
    execute: async function (msg: Message, args: string[], bot: Client) {
        if (args.length < 6) return msg.reply("Missing arguments.");

        const full_arguments = args.join(" ");
        const matched_arguments = full_arguments.match(matching);
        
        if (matched_arguments) {
            if (matched_arguments.length < 6) return msg.reply("Missing arguments.");
            
            
            const parsed = {
                player: matched_arguments[0],
                title: matched_arguments[1],
                diffname: "[" + matched_arguments[2] + "]",
                accuracy: matched_arguments[3],
                combo: matched_arguments[4],
                mods: matched_arguments[5],
                bglink: matched_arguments[6],
                str_darkvalue: matched_arguments[7],
                darkvalue: 0.0
            };


            if (parsed.str_darkvalue) {
                parsed.darkvalue = parseFloat(matched_arguments[7]);
                if ( parsed.darkvalue < 0 || parsed.darkvalue > 1 ) {
                    return msg.reply("A bit too much. `0 to 1`")
                }
            } else {
                parsed.darkvalue = 0.75
            }


            const resolution = {
                x: 1280,
                y: 720
            }

            const text: Text[] = [
                {
                    text: parsed.player,
                    position: {
                        x: resolution.x / 2,
                        y: 100,
                        size: 55
                    }
                },
                {
                    text: parsed.title,
                    position: {
                        x: resolution.x / 2,
                        y: 250,
                        size: 80
                    }
                },
                {
                    text: parsed.diffname,
                    position: {
                        x: resolution.x / 2,
                        y: 320,
                        size: 60
                    }
                },
                {
                    text: parsed.accuracy,
                    position: {
                        x: resolution.x / 14,
                        y: 500,
                        size: 70,
                        align: "left"
                    }
                },
                {
                    text: parsed.combo,
                    position: {
                        x: resolution.x / 1.1,
                        y: 500,
                        size: 70,
                        align: "right"
                    }
                },
                {
                    text: parsed.mods,
                    position: {
                        x: resolution.x / 2,
                        y: 600,
                        size: 75
                    }
                }
            ]

            try {
                if (parsed.bglink) {
                    const { canvas } = await combineImages(parsed.bglink, text, undefined, [resolution.x, resolution.y], parsed.darkvalue);
                    const pngBuffer = canvas.toBuffer('image/png', { compressionLevel: 2, filters: canvas.PNG_FILTER_NONE });
                    msg.reply({ files: [pngBuffer] })
                } else {
                    msg.reply("Image Bglink where?")
                }
            } catch (err) {
                msg.reply(`Error!: \`${err}\``);
            }

        } else {
            msg.reply("Wrap the arguments in brackets `[]`");
        }
    }
}