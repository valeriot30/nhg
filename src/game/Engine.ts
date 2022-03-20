import Vue from 'vue'
import generalConfig from './configurations/general.json'
import Logger from './utils/Logger'
import NetworkingManager from './networking/NetworkingManager'
import UserInterfaceManager from './engine/ui/UserInterfaceManager'
import Sprite from './utils/Sprite'
import UIComponent from './engine/ui/components/UIComponentEnum'
import GameLoaderUI from './engine/ui/components/loader/GameLoaderUI'
import Application from './engine/graphics/Application'
import * as PIXI from "pixi.js"
import RoomManager from './engine/room/RoomManager'
import Point from './utils/point/Point'
import Avatar from './engine/ui/imagers/avatars/Avatar'
import { Direction } from './engine/ui/imagers/avatars/Direction'
import { ItemType } from './engine/ui/imagers/items/FurniImager'
import RoomVisualization from './engine/room/visualization/RoomVisualization'
import FloorItem from './engine/room/objects/items/FloorItem'
import Point3d from './utils/point/Point3d'
import UserManager from './engine/user/UserManager'
import Environment from './engine/game/Environment'

export default class Engine {

    private static _instance: Engine | null = null
    private vue: Vue | null = null;

    public sso: string = "";

    public static getInstance(): Engine {
        if (Engine._instance == null) {
            Engine._instance = new Engine()
        }
        return Engine._instance
    }

    private config = generalConfig
    private gameEnvironment: Environment | null = null;
    private logger: Logger | null = null
    private networkingManager: NetworkingManager | null = null
    private userInterfaceManager: UserInterfaceManager | null = null
    private applicationProvider: Application | null = null;
    private gameLoader: PIXI.Loader | null = null;
    private roomManager: RoomManager | null = null;
    private userManager: UserManager | null = null;

    private timeElapsed: number = 0
    private lastFrameTime: number = 0


    private constructor() { }

    public async init() {
        this.gameLoader = new PIXI.Loader();
        this.logger = new Logger();
        this.userInterfaceManager = new UserInterfaceManager(this, this.gameLoader!);
        this.applicationProvider = new Application();
        this.logger.log("%cNHG CLIENT v" + generalConfig.version, "font-size:2rem; background-color:#069; color: #fff; padding:10px 45px;")
        this.logger.log("%cNon copiare codice in questa finestra", "color: red; font-size:1.2rem;")
        this.logger!.info("Loading game")
        this.userManager = new UserManager(Engine.getInstance());
        this.networkingManager = new NetworkingManager(this);
        this.roomManager = new RoomManager(this);
        this.gameEnvironment = new Environment();
        this.userManager.setUp();
        this.setUpEvents();
        this.setUpGameLoop();

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        if (!(window as any).engine && this.config.debug) {
            (window as any).engine = Engine.getInstance()
        }
        
        this.userInterfaceManager?.getUIComponentManager().loadGameComponents()
        this.userInterfaceManager?.getUIComponentManager().initGameComponents()
        await this.userInterfaceManager.init();
        // (this.userInterfaceManager!.getUIComponentManager().getComponent(UIComponent.LoginUI) as LoginUI).hide()
        //this.networkingManager = new NetworkingManager(Engine.getInstance());

        let loader = (this.userInterfaceManager?.getUIComponentManager().getComponent(UIComponent.GameLoaderUI) as GameLoaderUI)

        loader.updateProgress(50)

        /*let room = this.roomManager!.setRoom("prova", "xxxxxxxxxxxx/xxxxxxxxxxxx/xxxxxxxxxxxx/xxxxxxxxxxxx/xxxxxxxxxxxx/xxxxx000000x/xxxxx000000x/xxxx0000000x/xxxxx000000x/xxxxx000000x/xxxxx000000x/xxxxxxxxxxxx/xxxxxxxxxxxx/xxxxxxxxxxxx/xxxxxxxxxxxx/xxxxxxxxxxxx", new Point(7, 4), 200);

        let item = await this.userInterfaceManager!.getFurniImager().loadFurniSprite(ItemType.FloorItem, "doorC");
        item.start();
        //console.log(item);
        //(room.getRoomLayout().Visualization as RoomVisualization).getCanvasFloor().addChild(item);

        let avatar = new Avatar("hd-180-1.ch-255-66.lg-280-110.sh-305-62.ha-1012-110.hr-828-61", Direction.SOUTH, Direction.SOUTH);

        this.userInterfaceManager.avatarImager.Data.loadGameData().then(() => {
            this.userInterfaceManager?.avatarImager.loadAvatar(avatar).then(() => {
                this.userInterfaceManager?.avatarImager.drawAvatar(avatar)
            });
        })

        console.log(avatar);
        (room.getRoomLayout().Visualization as RoomVisualization).Container.addChild(avatar.Container);

        let roomV = room.getRoomLayout().Visualization as RoomVisualization;

        let furni = new FloorItem(room, "habbocake", new Point3d(0, 0, 0), item);*/


    }

    public complete() {
        let loader = (this.userInterfaceManager?.getUIComponentManager().getComponent(UIComponent.GameLoaderUI) as GameLoaderUI)
        loader.updateProgress(100);
    }

    private setUpEvents(): void {
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                (window as any).webkitRequestAnimationFrame ||
                (window as any).window.mozRequestAnimationFrame ||
                (window as any).window.oRequestAnimationFrame ||
                (window as any).window.msRequestAnimationFrame ||
                function (callback) {
                    let fpsInterval = 1000 / Engine.getInstance().config.fps

                    window.setTimeout(callback, fpsInterval);
                };
        })();
    }

    private setUpGameLoop(): void {
        let fpsInterval = 1000 / Engine.getInstance().config.fps
        this.lastFrameTime = Date.now()

        let gameLoop = () => {
            window.requestAnimationFrame(gameLoop)
            
            let currentTime = Date.now()

            this.timeElapsed = currentTime - this.lastFrameTime; 

            if (this.timeElapsed > fpsInterval) {
                this.roomManager?.tick(this.timeElapsed)
                this.userManager?.tick(this.timeElapsed)

                this.lastFrameTime = currentTime //- (this.timeElapsed % fpsInterval)
            }            
        }

        gameLoop()
    }



    private setUpCustomElements(): void {
        if (!customElements.get("sprite-canvas"))
            window.customElements.define("sprite-canvas", Sprite, {
                extends: 'canvas'
            });

        /*if (!window.devicePixelRatio)
            window.devicePixelRatio = 1*/
    }


    public getConfig() {
        return this.config
    }

    public getLogger(): Logger {
        return this.logger!
    }

    public getNetworkingManager(): NetworkingManager {
        return this.networkingManager!
    }

    public getUserInterfaceManager(): UserInterfaceManager {
        return this.userInterfaceManager!
    }
    public getDisplay(): Application | null {
        return this.applicationProvider;
    }

    public get Application(): Application | null {
        return this.applicationProvider;
    }
    public get Vue(): Vue {
        return this.vue!;
    }
    public set Vue(vue: Vue) {
        this.vue = vue;
    }

    public get UsersManager(): UserManager | null {
        return this.userManager
    }

    public get RoomsManager(): RoomManager | null {
        return this.roomManager;
    }

    public get GameLoader() : PIXI.Loader | null {
        return this.gameLoader;
    }

    public get SSO() {
        return this.sso;
    }

    public set SSO(sso: string) {
        this.sso = sso;
    }
    public get GameEnvironment(): Environment | null {
        return this.gameEnvironment;
    }
}