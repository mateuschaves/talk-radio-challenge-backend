
import { File, Game } from './helpers'

class Main {
    constructor() {
        this.initialize();
    }

    initialize() {
        const content = File.readFile('games.log', 'utf8');
        const [first, second, game] = Game.getAllGames(content);
        Game.getAllPlayersFromGame(game);

    }
}

export default new Main();