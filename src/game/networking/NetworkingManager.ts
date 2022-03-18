import Engine from '../Engine'

import WebSocketManager from './WebSocketManager'
import PacketManager from './packets/PacketManager'
import { OutgoingPacket } from './packets/outgoing/OutgoingPacketEnum'


class NetworkingManager {

    private engine: Engine

    private webSocketManager: WebSocketManager
    private packetManager: PacketManager

    constructor(engine: Engine) {
        this.engine = engine

        this.webSocketManager = new WebSocketManager(this)
        this.packetManager = new PacketManager(this)

        //this.setUpPingRequest()
    }

    public setUpPingRequest() : void {
        if (this.engine.getConfig().offlineMode)
            return

        window.setInterval(() => {
            this.packetManager.applyOut(OutgoingPacket.PingRequest);
        }, 50000);

        window.onbeforeunload = () => {
            this.packetManager.applyOut(OutgoingPacket.DisconnectMessage);
        };
    }

    public getEngine() : Engine {
        return this.engine
    }

    public getWebSocketManager() : WebSocketManager {
        return this.webSocketManager
    }

    public getPacketManager() : PacketManager {
        return this.packetManager
    }
}

export default NetworkingManager