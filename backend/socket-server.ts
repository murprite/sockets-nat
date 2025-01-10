import express, { Express } from "express";
import MainRouter from "./router";

export default class SocketServer {
    app : Express;
    indexHTML: string = "Hello World!";
    port: number = 5000;

    routerList: MainRouter[] = [
        new MainRouter(),
    ];

    constructor() {
        this.app = express();

        for (const router of this.routerList) {
            this.app.use(router.create(this.app, this));
        }

        this.app.use("/about", (req, res) => {
            res.send("Did you expect something, huh? There's nothing to see");
        })

        // Final universal route for the rest
        this.app.use("*", (req, res) => {
            res.send(this.indexHTML);
        })

    }
    async prepare() {
        this.app.listen(this.port, () => {
            console.log(`Start listening at ${this.port} port`);
        });
    }
}