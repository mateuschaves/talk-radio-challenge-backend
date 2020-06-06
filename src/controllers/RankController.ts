import { Request, Response } from 'express';
import { File, Game } from '../helpers';

import { IGame } from '../shared/interfaces';
class RankController {

    private games: IGame[] = [];
    private gameLogFile: string;

    constructor() {
        this.proccessGameLogFile();
        Game.proccessGeneralRank(this.gameLogFile);
    }

    show = (request: Request, response: Response) => {
        return response.status(200).json(Game.proccessGeneralRank(this.gameLogFile));
    }

    proccessGameLogFile = () => {
        const gameLogFile = File.readFile('games.log', 'utf-8');
        const games = Game.proccessGameLogFile(gameLogFile);
        this.gameLogFile = gameLogFile;
        this.games = games;
    }
}

export default new RankController();