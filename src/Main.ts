
import { File } from './helpers'

class Main {
    constructor() {
        this.initialize();
    }

    initialize() {
        const content = File.readFile('games.log', 'utf8');
        console.log(File.getAllGames(content));
    }
}

export default new Main();