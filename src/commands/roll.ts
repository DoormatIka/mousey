import { Command } from "../functions/tools"
import { Client, Message } from "discord.js"

export const command: Command = {
    name: "roll",
    description: "Roll dice. `=>roll [number of dice]d[how many sides]s`",
    execute: function (msg: Message, args: string[], bot: Client) {
        if (args.length == 0) return console.log("Nothing found.")

        const rolls = splitplus(args[0])

        if (rolls.length == 0 || !rolls[0].match('d') || !rolls[1].match('s')) {
            return msg.reply("Unable to parse your dice.")
        }
        
        const dice = rolls[0]
        const sides = rolls[1]

        const parsed = {
            dice: parseInt(dice.replace('d', '')),
            sides: parseInt(sides.replace('s', ''))
        }

        const arr_rolls = calculateDiceRoll(parsed.dice, parsed.sides)
        const total_rolls = arr_rolls.reduce((partialSum, a) => partialSum + a, 0)

        msg.reply(`You rolled: ${total_rolls} | ${arr_rolls.join(" , ")}`)
    }
}

function calculateDiceRoll(dice: number, sides: number) {
    let total: number[] = []

    for (let i = 0; i < dice; i++) {
        total.push( Math.ceil(Math.random() * sides) )
    }
    return total
}

function splitplus(str: string): RegExpMatchArray {
    const rexp: RegExp = /[0-9]+[a-z]/g

    const match = str.match(rexp)
    if (match == null) {
        return []
    }
    return match
}