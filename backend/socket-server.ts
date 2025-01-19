import express, { Express } from "express";
import MainRouter from "./router";
import { Server } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import Logger from "./logger";

const log = new Logger();

export default class SocketServer {
    app : Express;
    indexHTML: string = "Hello World!";
    port: number = 5001;
    httpServer: HTTPServer;
    io: Server;

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

        // Final universal route for the rest routes
        this.app.use("*", (req, res) => {
            res.send(this.indexHTML);
        })

    }
    async prepare() {
        this.io.on("connection", socket => {
            log.info("SocketServerPrepare", "Client connected " + socket.id);

            log.info("SocketServerPrepare", "Begin to verify client's request...");

            try {
                this.validateSocket(socket);
            } catch (e) {
                log.error("SocketServerPrepare", "Client's body is invalid, disconnecting...");
                console.log(e);
            }
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