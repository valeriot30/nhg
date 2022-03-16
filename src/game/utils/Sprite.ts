import CanvasUtils from "./CanvasUtils";

export default class Sprite extends HTMLCanvasElement {

    private spriteOffset: {
        x: number,
        y: number,
        z: number
    }

    private visible: boolean

    private interactive: boolean

    private texture: CanvasImageSource | null = null

    private tintColor: number

    constructor(texture: CanvasImageSource | null = null) {
        super();

       this.spriteOffset = {
            x: 0,
            y: 0,
            z: 0
        }

        this.visible = false
        this.interactive = false

        this.init()
        this.setTexture(texture)
        this.setVisible(this.visible)

        this.tintColor = 0xffffff
    }

    init() {
        this.style.position = "absolute"
        this.width = 0
        this.height = 0
    }

    setTexture(texture: CanvasImageSource | null) {

        if (!texture)
            return

        this.texture = texture

        let ctx = this.getContext('2d')

        if (ctx == null)
            return

        this.height = parseInt(this.texture.height.toString())
        this.width = parseInt(this.texture.width.toString())

        ctx.drawImage(this.texture, 0, 0);
    }

    update()
    {
        let ctx = this.getContext('2d')

        if (ctx == null || this.texture == null)
            return

        this.height = parseInt(this.texture.height.toString())
        this.width = parseInt(this.texture.width.toString())

        ctx.drawImage(this.texture, 0, 0);
    }

    clear()
    {
        let ctx = this.getContext('2d')
        
        if (ctx == null)
            return

        ctx.clearRect(0, 0, this.width, this.height)
    }

    setVisible(flag: boolean) {
        this.visible = flag

        if (flag) {
            this.style.display = "block"
        } else {
            this.style.display = "none"
        }
    }

    flip(flipH: boolean, flipV: boolean) {
        let scaleH = flipH ? -1 : 1, // Set horizontal scale to -1 if flip horizontal
            scaleV = flipV ? -1 : 1, // Set verical scale to -1 if flip vertical
            posX = flipH ? this.width * -1 : 0, // Set x position to -100% if flip horizontal 
            posY = flipV ? this.height * -1 : 0; // Set y position to -100% if flip vertical


        let canavs = document.createElement("canvas")
        canavs.height =  this.height
        canavs.width =  this.width
        let ctx = canavs.getContext('2d')
        if (ctx == null || this.texture == null)
            return

        ctx.save();
        ctx.clearRect(0, 0, this.width, this.height)
        ctx.scale(scaleH, scaleV);
        ctx.drawImage(this.texture, posX, posY, this.width, this.height);
        ctx.restore();

        this.setTexture(canavs)
    }

    setBlendMode(mode : any) {
        (this.style as any).mixBlendMode = mode
    }

    setAlpha(value: number) {
        let ctx = this.getContext('2d')

        if (ctx == null)
            return
        ctx.globalAlpha = value
    }

    int2rgb(color: number, alpha = 255) {
        return [
            ((color >> 16) & 0xff),
            ((color >> 8) & 0xff),
            ((color) & 0xff),
            alpha
        ];
    }

    tint(color: number, alpha = 255) {

        if(color == this.tintColor)
        {
            return
        }

        this.tintColor = color
        let rgb = this.int2rgb(color, alpha)

        let ctx = this.getContext('2d')

        if (ctx == null || this.texture == null)
            return

        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]}, ${rgb[2]},${alpha})`;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(this.texture, 0, 0);

        ctx.globalCompositeOperation = 'destination-atop';
        ctx.drawImage(this.texture, 0, 0);
    }

    getSpriteOffset()
    {
        return this.spriteOffset
    }

    isInteractive(): boolean
    {
        return this.interactive
    }

    isVisible(): boolean
    {
        return this.visible
    }

    setInteractive(value: boolean)
    {
        return this.interactive = value
    }

    clip(x: number, y: number, w: number, h: number): Sprite
    {
        let canavs = document.createElement("canvas")
        canavs.height = h
        canavs.width = w
        canavs.getContext("2d")?.drawImage(this, x, y, w, h, 0, 0, w, h)

        let tmpSprite = new Sprite()
        tmpSprite.setTexture(canavs)

        return tmpSprite
    }

    getTintColor(): number
    {
        return this.tintColor
    }
}