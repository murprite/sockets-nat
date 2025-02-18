import { io, Socket } from "socket.io-client";

interface IClientOptions {
    color: string;
}

export default class Client {
    serverEndpoint: string = "http://localhost:5001";
    socket: Socket;
    userID: string | undefined;
    options: IClientOptions;

    constructor(private updatePeersCallback: (peers: string[]) => void, private updateMessagesCallback: (messages: Array<string[]>) => void) {
        this.socket = io(this.serverEndpoint);

        this.options = {color: "#AA1111"};
        
        this.socket.on("updatePeersList", (newPeers) => {
            this.updatePeersCallback(newPeers);
        });

        this.socket.on("updateMessages", messages => {
            this.updateMessagesCallback(messages);
            console.log("should be on reload")
        });
    }

    async disconnectServer() {
        this.socket.disconnect();
    }

    async connectUser() {
        this.socket.connect();
    }

    async sendMessage(msg) {
        this.socket.emit("sendMessage", [this.socket.id, msg]);   
    }

    requestPeersList() {
        this.socket.emit("getPeersList", this.userID);
    }
    requestMessages() {
        this.socket.emit("getMessagesList", this.userID);
    }
}
