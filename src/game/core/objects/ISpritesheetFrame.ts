export interface ISpritesheetFrame {
    frame: {
        x: number,
        y: number,
        w: number,
        h: number
      },
      sourceSize: {
        w: number,
        h: number
      },
      spriteSourceSize: {
        x: number,
        y: number,
        w: number,
        h: number
      },
      rotated: false,
      trimmed: false
}