import { Command } from "../functions/tools"
import { Client, Message } from "discord.js"
import { combineImages, Text, Images } from "../functions/canvas"

const weather = require('weather-js')


export const command: Command = {
    name: "forecast",
    description: "Gets the forecast.\n`=>forecast [location]`",
    execute: function (msg: Message, args: string[], bot: Client) {
        if (args.length == 0) return console.log("Did you provide an address?")
        
        weather.find(
            { search: args.join(""), degreetype: 'C' },
            async function(err: any, result: Weather) { getForecast(err, result, msg) }
        )
    }
}

async function getForecast(err: any, result: Weather, msg: Message) {
    if (err) return console.log(err);

    const res = result[0];
    if (!res) return console.log("nothing found for that location")

    const text: Text[] = []
    const img: Images[] = []

    const name = autoSplitter(res.location.name, /,/g)
    
    for (let i = 0; i < res.forecast.length; i++) {
        let scale = i * 160

        text.push(
            { text: `Low: ${res.forecast[i].low}C`, position: { x: 150 + scale, y: 300, size: 25 } },
            { text: `High: ${res.forecast[i].high}C`, position: { x: 150 + scale, y: 340, size: 25 } },
            { text: res.forecast[i].shortday, position: { x: 150 + scale, y: 180, size: 30 } }
        )
        img.push(
            { imgpath: `https://blob.weather.microsoft.com/static/weather4/en-us/law/${res.forecast[i].skycodeday}.gif`, position: { x: 125 + scale, y: 200 } }
        )
    }

    text.push(
        { text: name, position: { x: 480, y: 68, size: 30 } }
    )

    const { canvas } = await combineImages(
        "./src/assets/night_forecast.png", 
        text, img,
        [960, 540]
    );


    const pngBuffer = canvas.toBuffer('image/png', { compressionLevel: 2, filters: canvas.PNG_FILTER_NONE })
    msg.reply({ content: "This is still unfinished!", files: [pngBuffer] })
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
    "low": string, // 74
    "high": string, // 93
    "skycodeday": string, // 4
    "skytextday": string, // T-Storms
    "date": string,  // 2022-05-22
    "day": string, // Sunday
    "shortday": string, // Sun
    "precip": string // 100
}