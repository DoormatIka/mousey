import { Command } from "../functions/tools"
import { combineImages, Text } from "../functions/canvas"

import { set_database, get_database } from "../functions/db"

const weather = require('weather-js')
import StormDB from "stormdb"
import { Client, Message } from "discord.js"

const engine = new StormDB.localFileEngine("./src/general.stormdb");
const db = new StormDB(engine);
db.default({ users: [], server: [] });


export const command: Command = {
    name: "weather",
    description: "Checks weather. `=>weather [city]` \nOr `=>weather set [city]` to avoid typing out your location every time.",
    execute: async function (msg: Message, args: string[], bot: Client) {

        let address_args: string;

        if (args[0] == 'set') {
            args.shift()

            if (args) {
                await set_database(db, msg.author.id, "location", args.join(""))
                return msg.reply(`Set location to: ${args.join("")}`)
            } else {
                return msg.reply("Location not found.")
            }
                
        } // RETURNS ON ALL CASES except if args != 'set'

        if (args.length == 0) { // GETS FROM DATABASE (no arguments recieved)
            const user = get_database(db, msg.author.id)

            if (user.length != 0) {
                // Get address from database.
                address_args = user[0].attributes.location
            } else {
                // CATCH ALL
                return msg.reply(`No location found.`)
            }
        } else {
            address_args = args.join("") // if address is given
        }


        weather.find(
            { search: address_args, degreeType: 'C' },
            async function(err: any, result: Weather) { getWeather(err, result, msg) }
        )

    }
}


async function getWeather(err: any, result: Weather, msg: Message) {
    if (err) return console.log(err);

    const res = result[0];
    if (!res) return msg.reply("Nothing found for that location.")

    const address = autoSplitter(`${res.location.name}`, /,/g)

    const text: Text[] = [
        { text: `${address}`, position: { x: 300, y: 250, size: 35 } },
        { text: `${res.current.temperature}C`, position: { x: 300, y: 350, size: 80 } },
        { text: `${res.current.date}`, position: { x: 150, y: 750, size: 35 } },
        { text: `${res.current.observationtime}`, position: { x: 450, y: 750, size: 35 } },
        { text: `Time recorded:`, position: { x: 450, y: 710, size: 25 } },
        { text: `Feels like: ${res.current.feelslike}C`, position: { x: 300, y: 400, size: 30 } },
        { text: `${res.current.day}`, position: { x: 150, y: 710, size: 25 } },
        { text: `${res.current.winddisplay}`, position: { x: 300, y: 550, size: 40 } },
        { text: `Wind Speed:`, position: { x: 300, y: 500, size: 25 } },
    ]
        
    const { canvas } = await combineImages("./src/assets/sky.jpg", text);

    const pngBuffer = canvas.toBuffer('image/png', { compressionLevel: 2, filters: canvas.PNG_FILTER_NONE })
    msg.reply({ files: [pngBuffer] })
}

function autoSplitter(str: string, find: RegExp): string {
    const matches = str.match(find)
    if (!matches?.length) return str;
    if (matches.length < 2) return str;
    

    const match = str.split(find)

    return `${match[0]}, ${match[1]}`
}

type Weather = [
    {
        "location": {
            "name": string,
            "lat": string,
            "long": string,
            "timezone": string,
            "alert": string,
            "degreetype": string,
            "imagerelativeurl": string
        },
        "current": {
            "temperature": string,
            "skycode": string,
            "skytext": string,
            "date": string,
            "observationtime": string,
            "observationpoint": string,
            "feelslike": string,
            "humidity": string,
            "winddisplay": string,
            "day": string,
            "shortday": string,
            "windspeed": string,
            "imageUrl": string
        },
        "forecast": Forecast[]
    }
]
type Forecast = {
    "low": string,
    "high": string,
    "skycodeday": string,
    "skytextday": string,
    "date": string,
    "day": string,
    "shortday": string,
    "precip": string
}