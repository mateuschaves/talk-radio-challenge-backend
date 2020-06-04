import { Log } from './';

class Game {
    public getAllGames(fileContent: string): string[] | null {
        if (fileContent.length)
            return fileContent.split('InitGame');
        else
            Log.error('empty log file');
        return null;
    }

    public getAllPlayersFromGame(game: string): string[] | null {

        let players = new Set();

        const lines = game.split(/\r\n|\r|\n/g);

        const linesWithKillEvent = lines.filter(line => line.search('Kill') > 0);

        linesWithKillEvent.forEach(line => {
            const { deadPlayerName, killerPlayerName } = this.getPlayersNamesFromKillEventLine(line);

            if (killerPlayerName != '<world>')
                players.add(killerPlayerName)

            players.add(deadPlayerName)
        });

        return null;
    }

    public getPlayersNamesFromKillEventLine(line: string): { killerPlayerName: string, deadPlayerName: string } {
        const key = 'killed';
        const indexOfStartKey = line.indexOf(key);
        const indexOfEndKey = indexOfStartKey + key.length;
        const killerPlayerName = line.slice(line.lastIndexOf(':') + 1, indexOfStartKey).trim();
        const deadPlayerName = line.slice(indexOfEndKey, line.lastIndexOf('by')).trim();
        return {
            killerPlayerName,
            deadPlayerName
        };
    }
}

export default new Game();