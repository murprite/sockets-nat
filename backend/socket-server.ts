import express, { Express } from "express";
import MainRouter from "./router";
import { Server, Socket } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import Logger from "./logger";
import { randomUUID } from "crypto";

import { IMessage } from "../frontend/src/constants";

interface IPeer {
    socket: Socket,
    username: string,
    color: string
}

const log = new Logger();

export default class SocketServer {
    app : Express;
    indexHTML: string = "Hello World!";
    port: number = 5001;
    httpServer: HTTPServer;
    io: Server;
    peers = new Map<string, IPeer>();
    messages: IMessage[] = [];

    routerList: MainRouter[] = [
        new MainRouter(),
    ];

    constructor() {
        this.app = express();
        this.httpServer = createServer();
        this.io = new Server(this.httpServer, {
            cors: {
                origin: "*",
                credentials: true
              }
        });

        for (const router of this.routerList) {
            this.app.use(router.create(this.app, this));
        }

        this.app.use("/about", (req, res) => {
            res.send("Did you expect something, huh? There's nothing to see");
        })

        // Universal route
        this.app.use("*", (req, res) => {
            res.send(this.indexHTML);
        })

    }
    async prepare() {
        this.io.on("connection", socket => {
            // Add peer to the map
            log.info("SocketServerPrepare", "Client connected " + socket.id);

            socket.on("getPeersList", () => {
                this.io.emit("updatePeersList", Array.from(this.peers.values()));
            });
            
            socket.on("getMessagesList", () => {
                this.io.emit("updateMessages", this.messages);
            });

            // Delete peers from map, so they won't be shown for clients
            socket.on("disconnect", reason => {
                const user = this.peers.get(socket.id);

                log.info("SocketServerPrepare", "Client disconnected, reason " + reason);

                this.io.emit("clientDisconected", user?.username);

                this.messages.push({
                    messageid: "0",
                    userid: "0",
                    username: "",
                    color: "aliceblue",
                    message: `${user?.username} вышел из чата`,
                    class: "SystemMessage"
                });

                this.peers.delete(socket.id);
                this.io.emit("updatePeersList", Array.from(this.peers.values()));
                this.io.emit("updateMessages", this.messages);
            });

            socket.on("sendMessage", ([id, username, message, color]) => {
                this.messages.push({
                    messageid: randomUUID(),
                    username: id,
                    userid: username,
                    color,
                    message,
                });
                this.io.emit("updateMessages", this.messages);

                console.log(this.messages)
            });


            // Listening clients if someone is trying to register
            socket.on("registerProfile", (data: IPeer) => {
                this.peers.set(socket.id, data);
                
                socket.emit("registeredProfile", {
                    status: "fulfilled",
                    profile: data,
                    errorMessage: ""
                });

                this.messages.push({
                    messageid: "0",
                    userid: "0",
                    username: "",
                    color: "aliceblue",
                    message: `${data.username} вошёл в чат`,
                    class: "SystemMessage"
                });

                this.io.emit("clientRegisteredProfile", data.username); 

                this.io.emit("updatePeersList", Array.from(this.peers.values()));
            })
        });

        this.httpServer.listen(this.port, () => {
            console.log(`Start listening at ${this.port} port`);
        });
        
    }

    validateSocket(socket) {
        // todo: check somehow
        return socket;
    } 

    async disconnectUser(userID: string) {
        return userID;
    }

    async broadcastMessage(msg: string) {
        this.io.send(msg);
    }
}