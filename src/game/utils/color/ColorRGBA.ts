/*import ColorRGB from "./ColorRGB"

export default class ColorRGBA extends ColorRGB {
    private alpha: number

    constructor(r: number, g: number, b: number, a: number) {
        super(r, g, b)
        this.alpha = a % 256
    }

    public getAlpha(): number {
        return this.alpha
    }

    public toString(): string {
        return `rgba(${ this.getRed() },${ this.getGreen() },${ this.getBlue() },${ this.alpha })`
    }

    public static getRandomColor(): ColorRGBA {
        const r = Math.round(Math.random() * 256);
        const g = Math.round(Math.random() * 256);
        const b = Math.round(Math.random() * 256);
        const a = Math.round(Math.random() * 256);

        return new ColorRGBA(r, g, b, a)
    }
}*/