import express, { Express, Router as ExpressRouter } from 'express';
import SocketServer from './socket-server';

abstract class Router {
    abstract create(app : Express, server : SocketServer): ExpressRouter;
}

export default class MainRouter extends Router {
    create(app: Express, server: SocketServer): ExpressRouter {
        const router: ExpressRouter = express.Router();
        
        router.get("/", (req, res) => {
            res.send(server.indexHTML);
        })

        return router;
    }
}

