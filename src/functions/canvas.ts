import { Canvas, createCanvas, loadImage, registerFont } from 'canvas'

registerFont('./src/assets/peter-bold.otf', { family: 'Peter' })
export type Text = {
    text: string,
    position: {
        x: number,
        y: number,
        size: number,
        align?: "center" | "end" | "left" | "right" | "start",
        color?: string
    }
}

export type Images = {
    imgpath: string,
    position: {
        x: number,
        y: number
    }
}

export type CanvasSize = [number, number]

export async function combineImages(
        bg: string, 
        texts?: Text[], 
        imagespaths?: Images[],
        canvassize: CanvasSize = [600, 900],
        darkenvalue?: number
    ) 
{

    const canvas: Canvas = createCanvas(canvassize[0], canvassize[1]);
    const ctx = canvas.getContext('2d')

    const image = await loadImage(bg)

    ctx.drawImage(image, 0, 0, canvassize[0], canvassize[1])


    if (darkenvalue) {
        ctx.globalAlpha = darkenvalue;
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, canvassize[0], canvassize[1]);
        ctx.fillStyle = "#FFFFFF"
        ctx.globalAlpha = 1.0;
    }



    if (texts) {
        for (let text of texts) {
            if (text.position.align) {
                ctx.textAlign = text.position.align
            } else {
                ctx.textAlign = "center"
            }

            ctx.font = `${text.position.size}px "Peter"`

            if (text.position.color) {
                ctx.fillStyle = text.position.color
            } else {
                ctx.fillStyle = "#FFFFFF"
            }
            ctx.fillText(text.text, text.position.x, text.position.y)
        }
    }
    
    if (imagespaths) {
        for (let imagepath of imagespaths) {
            const image = await loadImage(imagepath.imgpath)
            ctx.drawImage(image, imagepath.position.x, imagepath.position.y)
        }
    }

    return {
        canvas: canvas,
        ctx: ctx
    };

}
/*
const text: Text[] = [
    { text: `Usa, Japan`, position: { x: 300, y: 250, size: 35 } },
    { text: `25C`, position: { x: 300, y: 350, size: 80 } },
    { text: `10-9-2020`, position: { x: 150, y: 750, size: 35 } },
    { text: `09:30:00`, position: { x: 450, y: 750, size: 35 } },
    { text: `Feels like: 27C`, position: { x: 300, y: 400, size: 30 } },
    { text: `Tuesday`, position: { x: 150, y: 710, size: 25 } },
    { text: `3 mph West`, position: { x: 300, y: 550, size: 40 } },
    { text: `Wind Speed:`, position: { x: 300, y: 500, size: 25 } },
]

async function run() {
    const { canvas } = await combineImages(text, "./src/assets/sky.jpg");

    const stream = canvas.createPNGStream()
    const out = fs.createWriteStream('./test.png')
    stream.pipe(out)
    out.on('finish', () => console.log("Created."))
}

run()
*/