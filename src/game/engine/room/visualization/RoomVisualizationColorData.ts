import ColorRGB from "../../../utils/color/ColorRGB"
import NormalType from "./NormalTypeEnum"


export default class RoomVisualizationColorData {

    public static MASK_BRIGHTNESS_LIGHT = 0
    public static MASK_BRIGHTNESS_MEDIUM = -10
    public static MASK_BRIGHTNESS_DARK = -20

    public static getNormal(color: ColorRGB, type: NormalType) : ColorRGB {
        if (type == NormalType.DARK) {
            return color.brightness(RoomVisualizationColorData.MASK_BRIGHTNESS_DARK)
        }
        if (type == NormalType.MEDIUM) {
            return color.brightness(RoomVisualizationColorData.MASK_BRIGHTNESS_MEDIUM)
        }
        return color.brightness(RoomVisualizationColorData.MASK_BRIGHTNESS_LIGHT)
    }

}