import express, { Express } from "express";
import MainRouter from "./router";
import { Server, Socket } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import Logger from "./logger";

const log = new Logger();

export default class SocketServer {
    app : Express;
    indexHTML: string = "Hello World!";
    port: number = 5001;
    httpServer: HTTPServer;
    io: Server;
    peers = new Map<string, Socket>();
    messages: Array<string[]> = [];

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
            this.peers.set(socket.id, socket);

            socket.on("getPeersList", () => {
                this.io.emit("updatePeersList", Array.from(this.peers.keys()));
            });
            
            socket.on("getMessagesList", () => {
                this.io.emit("updateMessages", this.messages);
            });

            // Delete peers from map, so they won't be shown for other peers
            socket.on("disconnect", reason => {
                log.info("SocketServerPrepare", "Client disconnected, reason " + reason);
                this.peers.delete(socket.id);

                this.io.emit("updatePeersList", Array.from(this.peers.keys()));
            });

            socket.on("sendMessage", (message) => {
                this.messages.push(message);
                this.io.emit("updateMessages", this.messages);

                console.log(this.messages)
            });
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