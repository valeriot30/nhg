import Engine from "../../../../../Engine";

export default class AvatarDownloadManager {

    private complete: boolean = false;

    constructor() {

    }

    public loadConfigFile(resource: string): any {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            try
            {
                request.open('GET', `${Engine.getInstance().getConfig().avatarGameDataPath}/${resource}.json`);
    
                request.send();
    
                request.onloadend = e =>
                {
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                };
    
                request.onerror = e =>
                {
                    throw new Error('invalid_avatar_figure_map');
                };
            }
            catch (e)
            {
                console.log(e);
            }
        })
    }

    public loadSpriteSheet(part: string) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            try
            {
                request.open('GET', `${Engine.getInstance().getConfig().avatarFigurePath}/${part}/${part}_spritesheet.json`);
                request.send();
                request.onloadend = e =>
                {
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                };
                request.onerror = e =>
                {
                    throw new Error('invalid_avatar_figure_map');
                };
            }
            catch (e)
            {
                console.log(e);
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