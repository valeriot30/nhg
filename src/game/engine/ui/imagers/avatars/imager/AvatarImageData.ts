import AvatarDownloadManager from "./AvatarDownloadManager";
import AvatarActions from "./gamedata/AvatarActions";
import AvatarAnimations from "./gamedata/AvatarAnimatons";
import AvatarDrawOrder from "./gamedata/AvatarDrawOrder";
import AvatarGeometry from "./gamedata/AvatarGeometry";
import AvatarPartSetsData from "./gamedata/AvatarPartSetsData";
import FigureData from "./gamedata/FigureData";
import FigureMap from "./gamedata/FigureMap";
import { IAvatarImageData } from "./IAvatarImageData";
import { IPart } from "./IPart";

export default class AvatarImageData implements IAvatarImageData {

    public AvatarDownloadManager: AvatarDownloadManager;

    public avatarActions?: AvatarActions;
    public avatarPartSets?: AvatarPartSetsData;
    public avatarGeometry?: AvatarGeometry;
    public avatarDrawOrder?: AvatarDrawOrder;
    public avatarAnimations?: AvatarAnimations;
    
    private ready: boolean = false;

    public figureMap?: FigureMap;
    public figureData?: FigureData;

    private offsets: Map<string, any>;
    private spritesheets: Map<string, any>;


    constructor() {
        this.AvatarDownloadManager = new AvatarDownloadManager();
        this.offsets = new Map();
        this.spritesheets = new Map();
    }

    public async loadGameData() {
        this.figureMap = await this.AvatarDownloadManager.loadConfigFile("FigureMap");
        this.figureData = await this.AvatarDownloadManager.loadConfigFile("FigureData");
            this.avatarActions = await this.AvatarDownloadManager.loadConfigFile("HabboAvatarActions");
            this.avatarPartSets = await this.AvatarDownloadManager.loadConfigFile("HabboAvatarPartSets");
            this.avatarGeometry = await this.AvatarDownloadManager.loadConfigFile("HabboAvatarGeometry");
            this.avatarDrawOrder = await this.AvatarDownloadManager.loadConfigFile("AvatarDrawOrder");
            this.avatarAnimations = await this.AvatarDownloadManager.loadConfigFile("HabboAvatarAnimations");
            this.ready = true;
    }

    public async loadPart(part: string) {
        let spritesheet = await this.AvatarDownloadManager.loadSpriteSheet(part);
        let offset = await this.AvatarDownloadManager.loadOffsets(part);

        if(!this.offsets.has(part) && !this.spritesheets.has(part))
            this.offsets.set(part, offset); 
            this.spritesheets.set(part, spritesheet)
    }

    public get Ready(): boolean { return this.ready; }
    public get Offsets(): Map<string, any> { return this.offsets; }
    public get SpriteSheets(): Map<string, any> { return this.spritesheets; }
}