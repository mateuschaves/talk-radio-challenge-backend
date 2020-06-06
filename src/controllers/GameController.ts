import { Request, Response } from 'express';
import { File, Game } from '../helpers';

import { IGame } from '../shared/interfaces';
class GameController {

    public games: IGame[] = [];

    constructor() {
        this.proccessGameLogFile();
    }

    show = (request: Request, response: Response) => {
        const { id } = request.params;
        if (!id)
            return response.status(400).json({
                message: 'game not found'
            });

        const game = this.games[id];
        if (game)
            return response.status(200).json(game);
        else
            return response.status(400).json({
                message: 'game not found'
            });
    }

    proccessGameLogFile = () => {
        const gameLogFile = File.readFile('games.log', 'utf-8');
        const games = Game.proccessGameLogFile(gameLogFile);
        this.games = games;
    }
}

export default new GameController();