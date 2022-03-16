import AvatarDownloadManager from "./AvatarDownloadManager";
import AvatarActions from "./gamedata/AvatarActions";
import AvatarAnimations from "./gamedata/AvatarAnimatons";
import AvatarDrawOrder from "./gamedata/AvatarDrawOrder";
import AvatarGeometry from "./gamedata/AvatarGeometry";
import AvatarPartSetsData from "./gamedata/AvatarPartSetsData";
import FigureData from "./gamedata/FigureData";
import FigureMap from "./gamedata/FigureMap";

export interface IAvatarImageData {
    AvatarDownloadManager: AvatarDownloadManager;
    avatarActions?: AvatarActions;
    avatarPartSets?: AvatarPartSetsData;
    avatarGeometry?: AvatarGeometry;
    avatarDrawOrder?: AvatarDrawOrder;
    avatarAnimations?: AvatarAnimations;

    figureData?: FigureData;
    figureMap?: FigureMap;
}