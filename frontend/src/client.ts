import { io, Socket } from "socket.io-client";

export default class Client {
    serverEndpoint: string = "http://localhost:5001";
    socket: Socket;
    userID: string | undefined;

    constructor(private updatePeersCallback: (peers: string[]) => void) {
        this.socket = io(this.serverEndpoint);
        
        this.socket.on("updatePeersList", (newPeers) => {
            this.updatePeersCallback(newPeers); // Сообщаем компоненту об изменении
        });
    }

    async disconnectServer() {
        this.socket.disconnect();
    }

    async connectUser() {
        this.socket.connect();
    }

    async sendMessage(msg: string) {
        this.socket.emit("sendMessage", msg);   
    }

    requestPeersList() {
        this.socket.emit("getPeersList", this.userID);
    }
}
