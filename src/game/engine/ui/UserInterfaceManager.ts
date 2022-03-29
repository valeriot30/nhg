import Engine from "../../Engine"
import SoundManager from "./sound/SoundManager"
import UIComponentManager from './components/UIComponentManager'
import FurniImager from "./imagers/items/FurniImager"
import AvatarImager from "./imagers/avatars/imager/AvatarImager"

import * as PIXI from "pixi.js"
import AvatarImageData from "./imagers/avatars/imager/AvatarImageData"

export default class UserInterfaceManager {

    private engine: Engine

    private language: any

    private soundManager: SoundManager
    private UIComponentManager: UIComponentManager
    private furniImager: FurniImager
    private _avatarImager: AvatarImager
    private avatarImagerData: AvatarImageData | null = null;
    private loader: PIXI.Loader;
    

    private isInRoom: boolean = false

    constructor(engine: Engine, gameLoader: PIXI.Loader) {
        this.engine = engine
        this.loader = gameLoader;
        //this.language = require('@/assets/languages/' + this.engine.getConfig().language + ".json");
        this.furniImager = new FurniImager()
        this._avatarImager = new AvatarImager()
        this.soundManager = new SoundManager(this)
        this.UIComponentManager = new UIComponentManager(this)
    }

    public init(): Promise<void> {
        return Promise.all([
            this._avatarImager.Data.loadGameData(),
            this.furniImager.init()
        ]).then(() => {
            Engine.getInstance().networkingManager?.setUpPingRequest()
        }).catch(err => {
            if (this.engine.config.debug) {
                this.engine.logger?.error("UI initialization failed")
            }     
        })
    }

    public setInRoom(inRoom: boolean) : void {
        this.isInRoom = inRoom
    }

    public getEngine() : Engine {
        return this.engine
    }

    public getLanguage() {
        return this.language
    }

    public getUIComponentManager() : UIComponentManager {
        return this.UIComponentManager
    }

    public getSoundManager() : SoundManager {
        return this.soundManager
    }

    public getFurniImager(): FurniImager {
        return this.furniImager
    }

    public get avatarImager() : AvatarImager {
        return this._avatarImager
    }   
}