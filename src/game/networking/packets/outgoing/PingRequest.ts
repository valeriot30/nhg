import PacketManager from "../PacketManager";
import { OutgoingPacket } from "./OutgoingPacketEnum";

/**
 * Send a ping request to greet the server
 * @param packetManager PacketManager
 * @constructor
 */
export function PingRequest(packetManager: PacketManager)
{
    packetManager.getNetworkingManager().getPacketManager().applyOut(OutgoingPacket.PingRequest);
}