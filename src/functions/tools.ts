export interface Command {
    name: string,
    description: string,
    execute: Function
}

export function randomResponse(messages: string[]) {
    return messages[Math.floor(Math.random() * messages.length)]
}

export function random(numbers: number) {
    return Math.floor(Math.random() * numbers)
}