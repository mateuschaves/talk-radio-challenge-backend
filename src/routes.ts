import { Router } from 'express';

import { GameController, RankController } from './controllers';


class Routes {

    routes: Router;

    constructor() {
        this.routes = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.routes.get('/game/:id', GameController.show);
        this.routes.get('/rank/general', RankController.show)
    }


}


export default new Routes().routes;