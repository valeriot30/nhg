import ColorRGB from "../../../../utils/color/ColorRGB"
import IRoomMapPlane from "./IRoomMapPlane";

export default interface IRoomMapObject {
    getColor() : ColorRGB 
    getPlane() : IRoomMapPlane
}
