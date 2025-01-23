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
            log.info("SocketServerPrepare", "Client connected " + socket.id);
            this.peers.set(socket.id, socket);

            socket.on("sendMessage", msg => {
                console.log(msg)
            })

            socket.on("getPeersList", () => {
                this.io.emit("updatePeersList", Array.from(this.peers.keys()));
                console.log(this.peers.keys())
            });

            socket.on("disconnect", reason => {
                log.info("SocketServerPrepare", "Client disconnected, reason " + reason);
                this.peers.delete(socket.id);

                this.io.emit("updatePeersList", Array.from(this.peers.keys()));
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