import NetworkingManager from './NetworkingManager'
import Engine from '../Engine'
import { OutgoingPacket } from './packets/outgoing/OutgoingPacketEnum'
import UIComponent from '../engine/ui/components/UIComponentEnum'
import DefaultPanel from '../engine/ui/components/panel/DefaultPanel'

import SockJS from 'sockjs-client'

class WebSocketManager {

    private networkingManager: NetworkingManager

    private webSocket: WebSocket
    private reconnectCounter: number = 0

    private closed = false;

    constructor(networkingManager: NetworkingManager) {
        this.networkingManager = networkingManager

        if (Engine.getInstance().config.debug) {
            Engine.getInstance().logger?.debug("Connection url: " + this.getWebSocketUrl());
        }

        Engine.getInstance().logger?.info("Connecting to the server!")

        this.webSocket = new WebSocket(this.getWebSocketUrl())
        this.setUpWebSocketEvents()

    }

    private getWebSocketUrl(): string {
        let webSocketUrl = Engine.getInstance().config.server.ssl ? "wss://" : "ws://"
        webSocketUrl += Engine.getInstance().config.server.host
        webSocketUrl += ":" + Engine.getInstance().config.server.port
        webSocketUrl += "/" + Engine.getInstance().config.server.channel

        return webSocketUrl
    }

    private setUpWebSocketEvents(): void {

        this.webSocket.onopen = (event) => {
            Engine.getInstance().logger?.info("Connected");

            //his.networkingManager.getPacketManager().applyOut(OutgoingPacket.PingRequest);
            this.closed = false;
        }

        this.webSocket.onerror = (event) => {
            this.closed = true;

            Engine.getInstance().logger?.error("Connection error");

            if (Engine.getInstance().config.debug) {
                Engine.getInstance().logger?.debug("Connection error - event details: ");
                console.log(event)
            }
        }

        this.webSocket.onclose = (event) => {
            this.closed = true;
            //todo
            //(Engine.getInstance().getUserInterfaceManager().getUIComponentManager().getComponent(UIComponent.DefaultPanelUI) as DefaultPanel).set("Disconnected from the server");

            this.reconnectCounter = 0;

            if (Engine.getInstance().config.server.reconnectOnFail) {

                setInterval(() => {
                    while(this.closed && this.reconnectCounter <= Engine.getInstance().config.server.reconnectOnFailTryTimes) { 
                        (Engine.getInstance().userInterfaceManager?.getUIComponentManager().getComponent(UIComponent.DefaultPanelUI) as DefaultPanel).set("Reconnection try: " + this.reconnectCounter);
                        this.reconnectCounter++;
                        this.setUpWebSocketEvents();
                    }
                }, 2001);
                setTimeout(() => {
                    (Engine.getInstance().userInterfaceManager?.getUIComponentManager().getComponent(UIComponent.DefaultPanelUI) as DefaultPanel).set("Failed to connect to the server :(");
                }, 4000)
                
            }
        }

        window.onbeforeunload = () => this.disconnect()

        this.webSocket.onmessage = (event) => {
            let packet = JSON.parse(event.data);
            let header = parseInt(packet.header)
            this.networkingManager.getPacketManager().applyIn(header, packet.body);
        }
    }

    public getNetworkingManager(): NetworkingManager {
        return this.networkingManager
    }

    public sendData(message: any): void {
        if (!this.closed) {
            this.webSocket.send(JSON.stringify(message));
        }
    }

    public disconnect() {
        Engine.getInstance().logger?.info("Disconnected");
        this.networkingManager.getPacketManager().applyOut(OutgoingPacket.DisconnectMessage);
        this.webSocket.close()
    }

    public isClosed(): boolean {
        return this.closed
    }
}

export default WebSocketManager