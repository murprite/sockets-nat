import { Socket } from "socket.io";

export default class Room {
    initiator: string;
    users: string[];
    io: Socket;

    constructor(initiator: string, socket: Socket) {
        // Main user, who created a room
        this.initiator = initiator;
        this.io = socket;

    }

    async removePerson(userId: string, initiator: string) {
        this.io.emit("removeUser", () => {
            if(initiator !== this.initiator) return null;
        });
    }
}