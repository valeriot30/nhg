export default class CanvasUtils {
    
    public static trimCanvas(c : HTMLCanvasElement) {
        let ctx = c.getContext('2d')

        if (ctx == null) return
        
        let copy = document.createElement('canvas').getContext('2d'),
            pixels = ctx.getImageData(0, 0, c.width, c.height),
            l = pixels.data.length,
            i,
            bound: any = {
                top: null,
                left: null,
                right: null,
                bottom: null
            },
            x, y
        
        // Iterate over every pixel to find the highest
        // and where it ends on every axis ()
        for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] !== 0) {
                x = (i / 4) % c.width;
                y = ~~((i / 4) / c.width);
    
                if (bound.top === null) {
                    bound.top = y;
                }
    
                if (bound.left === null) {
                    bound.left = x;
                } else if (x < bound.left) {
                    bound.left = x;
                }
    
                if (bound.right === null) {
                    bound.right = x;
                } else if (bound.right < x) {
                    bound.right = x;
                }
    
                if (bound.bottom === null) {
                    bound.bottom = y;
                } else if (bound.bottom < y) {
                    bound.bottom = y;
                }
            }
        }
        
        // Calculate the height and width of the content
        var trimHeight = bound.bottom - bound.top,
            trimWidth = bound.right - bound.left,
            trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
    
        copy!.canvas.width = trimWidth;
        copy!.canvas.height = trimHeight;
        copy!.putImageData(trimmed, 0, 0);
    
        // Return trimmed canvas
        return copy!.canvas;
    }

    public static imageToCanvas(image: HTMLImageElement): HTMLCanvasElement
    {
        let canavs = document.createElement("canvas")
        let ctx = canavs.getContext("2d")

        canavs.width = image.width
        canavs.height = image.height
        ctx!.drawImage(image, 0, 0)

        return canavs
    }

    public static canvasToImage(canvas : HTMLCanvasElement) : HTMLImageElement {
		let image = document.createElement("img") as HTMLImageElement;
		image.src = canvas.toDataURL();
		return image;
	}

}