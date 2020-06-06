import { Log } from './';
import { PlayersNames } from '../shared/interfaces';

class Game {
    public getAllGames(fileContent: string): string[] | null {
        if (fileContent.length)
            return fileContent.split('InitGame');
        else
            Log.error('empty log file');
        return null;
    }

    public getAllPlayersFromGame(game: string): Set<string> {

        let players = new Set<string>();

        const lines = this.getGameLines(game);

        const linesWithKillEvent = lines.filter(line => line.search('Kill') > 0);

        linesWithKillEvent.forEach(line => {
            const { deadPlayerName, killerPlayerName } = this.getPlayersNamesFromKillEventLine(line);

            if (killerPlayerName != '<world>')
                players.add(killerPlayerName)

            players.add(deadPlayerName)
        });

        return players;
    }

    private getGameLines(game: string): string[] {
        return game.split(/\r\n|\r|\n/g);
    }

    public getPlayersNamesFromKillEventLine(line: string): PlayersNames {
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

    public getPlayerScore(player: string, game: string): number {

        if (player === '<world>')
            throw new Error('<world> is not a player');

        const key = 'killed';

        const lines = this.getGameLines(game);

        return lines.reduce((score, line) => {
            const indexOfStartKey = line.indexOf(key);
            const indexOfEndKey = indexOfStartKey + key.length;
            const killerPlayerName = line.slice(line.lastIndexOf(':') + 1, indexOfStartKey).trim();
            const deadPlayerName = line.slice(indexOfEndKey, line.lastIndexOf('by')).trim();

            if (killerPlayerName === deadPlayerName)
                return score;

            if (killerPlayerName === player)
                return score + 1;

            if (killerPlayerName === '<world>' && deadPlayerName === player)
                return score - 1;

            return score;
        }, 0);

    }
}

export default new Game();