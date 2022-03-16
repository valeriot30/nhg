export default class ColorRGB {
    private red: number
    private green: number
    private blue: number

    constructor(r: number, g: number, b: number) {
        this.red = r % 256
        this.green = g % 256
        this.blue = b % 256
    }

    public equals(color: ColorRGB): boolean {
        return this.red == color.getRed() && this.green == color.getGreen() && this.blue == color.getBlue()
    }

    public add(value: number) : ColorRGB {
        return new ColorRGB(this.red + value, this.green + value, this.blue + value)
    }

    public brightness(percentage: number) : ColorRGB {
        percentage = percentage < -100 ? -100 : percentage > 100 ? 100 : percentage
        let brightness = ((255 * percentage) / 100)
        let red = (this.red + brightness) < 0 ? 0 : (this.red + brightness) > 255 ? 255 : this.red + brightness
        let green = (this.green + brightness) < 0 ? 0 : (this.green + brightness) > 255 ? 255 : this.green + brightness
        let blue = (this.blue + brightness) < 0 ? 0 : (this.blue + brightness) > 255 ? 255 : this.blue + brightness

        return new ColorRGB(red, green, blue)
    }

    public getRed(): number {
        return this.red
    }

    public getGreen(): number {
        return this.green
    }
    
    public getBlue(): number {
        return this.blue
    }

    public toHexString(): string {
        return "#" + ((1 << 24) + (this.red << 16) + (this.green << 8) + this.blue).toString(16).slice(1);
    }

    public toHex(): number {
        return ((1 << 24) + (this.red << 16) + (this.green << 8) + this.blue)
    }

    public toString(): string {
        return `rgb(${ this.red },${ this.green },${ this.blue })`
    }

    public static getRandomColor(): ColorRGB {
        const r = Math.round(Math.random() * 256);
        const g = Math.round(Math.random() * 256);
        const b = Math.round(Math.random() * 256);

        return new ColorRGB(r, g, b)
    }

    public static getColorFromHex(hex: string): ColorRGB {

        if (hex.length == 4) {
            return new ColorRGB(parseInt("0x" + hex[1] + hex[1], 16), parseInt("0x" + hex[2] + hex[2], 16), parseInt("0x" + hex[3] + hex[3], 16))
        } else if (hex.length == 7) {
            return new ColorRGB(parseInt("0x" + hex[1] + hex[2], 16), parseInt("0x" + hex[3] + hex[4], 16), parseInt("0x" + hex[5] + hex[6], 16));
        }

        return new ColorRGB(0, 0, 0)
    }

    public static getColorFromNumber(num: number): ColorRGB {
        return new ColorRGB(((num >> 16) & 0xff),
                            ((num >> 8) & 0xff),
                            ((num) & 0xff),)
                
    }
}