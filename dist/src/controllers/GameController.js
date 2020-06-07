"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
class GameController {
    constructor() {
        this.games = [];
        this.show = (request, response) => {
            const { id } = request.params;
            const game = this.games[id];
            if (game)
                return response.status(200).json(game);
            else
                return response.status(400).json({
                    message: 'game not found'
                });
        };
        this.proccessGameLogFile = () => {
            const gameLogFile = helpers_1.File.readFile('games.log', 'utf-8');
            const games = helpers_1.Game.proccessGameLogFile(gameLogFile);
            this.games = games;
        };
        this.proccessGameLogFile();
    }
}
exports.default = new GameController();
//# sourceMappingURL=GameController.js.map