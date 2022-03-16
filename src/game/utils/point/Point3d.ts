import IPoint3d from "./IPoint3d"

export default class Point3d implements IPoint3d {
    
    private x: number
    private y: number
    private z: number

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    public getX(): number {
        return this.x
    }
    public getY(): number {
        return this.y
    }
    public getZ(): number {
        return this.z
    }
    
    public setX(value: number): void {
        this.x = value
    }
    public setY(value: number): void {
        this.y = value
    }
    public setZ(value: number): void {
        this.z = value
    }

    public static isEqual(p1: Point3d, p2: Point3d) : boolean {
        return p1.getX() == p2.getX() && p1.getY() == p2.getY() && p1.getZ() == p2.getZ()
    }

    public static add(p1: Point3d, p2: Point3d) : Point3d {
        return new Point3d(p1.getX() + p2.getX(), p1.getY() + p2.getY(), p1.getZ() + p2.getZ())
    }

    public static diff(p1: Point3d, p2: Point3d) : Point3d {
        return new Point3d(p1.getX() - p2.getX(), p1.getY() - p2.getY(), p1.getZ() - p2.getZ())
    }


    
}