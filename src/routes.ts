import { Router } from 'express';

import { GameController } from './controllers';


class Routes {

    routes: Router;

    constructor() {
        this.routes = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.routes.get('/game/:id', GameController.show);
    }


}


export default new Routes().routes;