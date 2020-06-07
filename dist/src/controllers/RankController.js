"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
class RankController {
    constructor() {
        this.games = [];
        this.show = (request, response) => {
            return response.status(200).json(helpers_1.Game.proccessGeneralRank(this.gameLogFile));
        };
        this.proccessGameLogFile = () => {
            const gameLogFile = helpers_1.File.readFile('games.log', 'utf-8');
            const games = helpers_1.Game.proccessGameLogFile(gameLogFile);
            this.gameLogFile = gameLogFile;
            this.games = games;
        };
        this.proccessGameLogFile();
        helpers_1.Game.proccessGeneralRank(this.gameLogFile);
    }
}
exports.default = new RankController();
//# sourceMappingURL=RankController.js.map