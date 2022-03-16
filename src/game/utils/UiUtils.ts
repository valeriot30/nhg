import { Container, DisplayObject, Matrix } from "pixi.js";
import Engine from "../Engine";

export default class UiUtils {

    static guidGenerator() {
        let S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()) + Date.now().toString();
    }

    static htmlToElement(html: any) {
        let template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    static getGlobalPosition(object: DisplayObject | Container): Matrix {
        return object.worldTransform;
    }

    static generateImageFromObject(object: DisplayObject | Container): HTMLImageElement | undefined {
        return Engine.getInstance().Application?.app?.renderer.plugins.extract.image((object));
    }



}