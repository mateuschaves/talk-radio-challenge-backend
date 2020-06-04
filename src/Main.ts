
import { File } from './helpers'

class Main {
    constructor() {
        this.initialize();
    }


    initialize() {
        File.readFile('games.log', 'utf8');
    }
}

export default new Main();