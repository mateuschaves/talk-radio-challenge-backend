"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
class Routes {
    constructor() {
        this.routes = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.routes.get('/game/:id', controllers_1.GameController.show);
        this.routes.get('/rank/general', controllers_1.RankController.show);
    }
}
exports.default = new Routes().routes;
//# sourceMappingURL=routes.js.map