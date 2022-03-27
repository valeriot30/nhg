
import { Viewport } from "pixi-viewport";
import * as PIXI from "pixi.js"

export default class Application extends PIXI.utils.EventEmitter {

    private _app: PIXI.Application | null = null;
    private dpi: number = 0;
    private view: any;
    private viewport: any

    constructor() {
        super();
        this.dpi = window.devicePixelRatio;
        this.init();
    }
    public init(): void {

        this._app = new PIXI.Application({
            backgroundColor: 0x12436d, // 
            height: window.innerHeight,
            width: window.innerWidth,
            transparent: false,
            resolution: this.dpi,
            antialias: false,
            powerPreference: "high-performance",
            resizeTo: window
        });

        this.viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: 0,
            worldHeight: 0,
            interaction: this._app.renderer.plugins.interaction
        })
        
        this._app.view.style.height = window.innerHeight + "px";
        this._app.view.style.width = window.innerWidth + "px";

        document.body.appendChild(this._app.view);
        this._app.stage.addChild(this.viewport)

        this.viewport.drag({
            wheel: false
        });
        //this.viewport.zoomPercent(-0.25) <- zoom for snowstorm

        window.onresize = () => {
            this.resize();
        }

    }

    private resize() {

        //this._app!.renderer.resize(window.innerWidth, window.innerHeight);
        
        this.emit("resize");

        this.app!.view.style.height = window.innerHeight + "px";
        this.app!.view.style.width = window.innerWidth + "px";


    }

    public get stage() {
        return this._app!.stage
    }

    public get app() {
        return this._app;
    }

    public get Viewport() {
        return this.viewport
    }
}