import { Socket } from "socket.io-client";

export interface IClient {
    color: string;
    id: string | undefined;
    username: string;
    socket: Socket;
}

export interface IMessage {
    messageid: string,
    userid: string,
    username: string,
    color: string,
    message: string,
    class?: string
}