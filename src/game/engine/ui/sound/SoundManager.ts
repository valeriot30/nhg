import UserInterfaceManager from '../UserInterfaceManager'
import SoundResource from './SoundResource'
import { Sound } from './SoundEnum'

class SoundManager {

    private userInterfaceManager: UserInterfaceManager

    private audioResourceFolder: string

    private volume: number
    private sounds: Map<Sound, SoundResource> = new Map()

    constructor(userInterfaceManager: UserInterfaceManager) {
        this.userInterfaceManager = userInterfaceManager
        
        this.audioResourceFolder = userInterfaceManager.getEngine().getConfig().soundResourcesUrl
        this.volume = 100;

        //this.loadAudioResources();
    }

    private loadAudioResources() : void {
        Object.values(Sound).forEach(sound => {
            this.sounds.set(sound, new SoundResource(this, sound))
        });
    }

    public play(soundName: Sound) {
        let sound = this.sounds.get(soundName)

        if (sound != undefined)
            sound.play()
    }

    public getResourceFolder() : string {
        return this.audioResourceFolder
    }

    public getUserInterfaceManager() : UserInterfaceManager {
        return this.userInterfaceManager
    }

}

export default SoundManager