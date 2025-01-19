import { io, Socket } from "socket.io-client";

export default class Client {
    // TODO: dynamically find server's endpoint
    serverEndpoint: string = "http://localhost:5001";
    socket: Socket;
    userID: string | undefined;

    constructor() {
        this.socket = io(this.serverEndpoint);
        this.userID = this.socket.id;
    }

    async disconnectServer() {
        this.socket.disconnect();
    }

    async connectUser() {
        this.socket.connect();
    }

    async sendMessage(msg: string) {
        this.socket.send(msg);
    }
}