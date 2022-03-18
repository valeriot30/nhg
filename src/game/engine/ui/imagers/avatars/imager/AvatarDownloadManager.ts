import Engine from "../../../../../Engine";
import { fetchJsonAsync } from "../../../../../utils/DownloadManager";

export default class AvatarDownloadManager {

    private complete: boolean = false;

    constructor() {

    }

    public loadConfigFile(resource: string): any {
        return new Promise((resolve, reject) => {
            try {
                resolve(fetchJsonAsync(`${Engine.getInstance().getConfig().avatarGameDataPath}/${resource}.json`));
            } catch(e) {
                console.log(e)
            }
        })
    }

    public loadSpriteSheet(part: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                resolve(fetchJsonAsync(`${Engine.getInstance().getConfig().avatarFigurePath}/${part}/${part}_spritesheet.json`));
            } catch(e) {
                console.log(e)
            }
        })
    }
    public loadOffsets(part: string) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            try
            {
                request.open('GET', `${Engine.getInstance().getConfig().avatarFigurePath}/${part}/${part}.json`);
                request.send();
                request.onloadend = e =>
                {
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                };
                request.onerror = e =>
                {
                    throw new Error('invalid_offset');
                };
            }
            catch (e)
            {
                console.log(e);
            }
        })
    }

}