import IPoint from "./IPoint"

export default class Point implements IPoint{

    private x: number
    private y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public getX(): number {
        return this.x
    }
    public getY(): number {
        return this.y
    }

    public setX(value: number): void {
        this.x = value
    }
    public setY(value: number): void {
        this.y = value
    }

    public static isEqual(p1: Point, p2: Point) : boolean {
        return p1.getX() == p2.getX() && p1.getY() == p2.getY()
    }

    public static add(p1: Point, p2: Point) : Point {
        return new Point(p1.getX() + p2.getX(), p1.getY() + p2.getY())
    }

    public static diff(p1: Point, p2: Point) : Point {
        return new Point(p1.getX() - p2.getX(), p1.getY() - p2.getY())
    }
    
    
}