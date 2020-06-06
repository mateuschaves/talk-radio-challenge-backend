
import { File, Game, Log } from './helpers'

class Main {
    constructor() {
        this.initialize();
    }

    initialize() {
        try {
            const content = File.readFile('games.log', 'utf8');
            const games = Game.proccessGameLogFile(content);
            console.log(games);
        } catch (error) {
            Log.error(error)
        }
    }
}

export default new Main();