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
import Avatar, { ActionId } from './engine/ui/imagers/avatars/Avatar'
import { Direction } from './engine/ui/imagers/avatars/Direction'
import { ItemType } from './engine/ui/imagers/items/FurniImager'
import RoomVisualization from './engine/room/visualization/RoomVisualization'
import FloorItem from './engine/room/objects/items/FloorItem'
import Point3d from './utils/point/Point3d'
import UserManager from './engine/user/UserManager'
import Environment from './engine/game/Environment'
import { GameMode } from './core/GameMode'

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

    private gameMode: GameMode = GameMode.OFFLINE;

    private constructor() { }

    public async init() {
        this.gameLoader = new PIXI.Loader();
        this.logger = new Logger();
        this.gameMode = Engine.getInstance().config.offlineMode ? GameMode.OFFLINE : GameMode.ONLINE
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
        PIXI.settings.ROUND_PIXELS = true;

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

        if(this.gameMode == GameMode.OFFLINE) {
            loader.updateProgress(100)
            let room = this.roomManager!.setRoom("prova", "111111111/1111111011111/111111111001/111111", new Point(7, 4), 200);

            let avatar = new Avatar("hd-180-1.ch-255-66.lg-280-110.sh-305-62.ha-1012-110.hr-828-61", Direction.SOUTH, Direction.SOUTH, new Set());

            this.userInterfaceManager.avatarImager.Data.loadGameData().then(() => {
                this.userInterfaceManager?.avatarImager.loadAvatar(avatar).then(() => {
                    this.userInterfaceManager?.avatarImager.drawAvatar(avatar)
                });
            });

          
            (room.getRoomLayout().Visualization as RoomVisualization).Container.addChild(avatar.Container);

            let item = await this.userInterfaceManager!.getFurniImager().loadFurniSprite(ItemType.FloorItem, "md_sofa");
            item.start();
            let roomV = room.getRoomLayout().Visualization as RoomVisualization;
            let furni = new FloorItem(room, "doorC", new Point3d(2, 3, 1), item);
            furni.getVisualization()?.render()
            room.RoomItemManager.addItem(furni)
        }

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