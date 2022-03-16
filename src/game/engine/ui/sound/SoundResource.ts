import SoundManager from "./SoundManager"

class SoundResource {

	private soundManager: SoundManager
	private name: string
	private audio: HTMLAudioElement

	constructor(soundManager: SoundManager, name: string) {
		this.soundManager = soundManager
		this.name = name

		this.audio = this.createAudioElement()
	}

	private createAudioElement() : HTMLAudioElement {
		return new Audio(this.soundManager.getResourceFolder() + this.name + '.mp3')
	}

	public getName() : string {
		return this.name
	}

	public play() {
		this.audio.play()
	}

}

export default SoundResource