
import { File, Game, Log } from './helpers'

class Main {
    constructor() {
        this.initialize();
    }

    initialize() {
        try {
            const content = File.readFile('games.log', 'utf8');
            const [first, second, game] = Game.getAllGames(content);
            const [firstPlayer] = Game.getAllPlayersFromGame(game);
            const score = Game.getPlayerScore('<world>', game);
            const allKillsFromGame = Game.getAllKillsFromGame(game);
        } catch (error) {
            Log.error(error)
        }
    }
}

export default new Main();