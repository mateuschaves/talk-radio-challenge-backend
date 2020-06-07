import { IPlayersNames, IGame, IRank } from '../shared/interfaces';

class Game {

    public getAllGames(fileContent: string): string[] | null {
        if (fileContent.length)
            return fileContent.split('InitGame');
        else
            throw new Error('log file is empty');
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

    public getPlayersNamesFromKillEventLine(line: string): IPlayersNames {
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


        const lines = this.getGameLines(game);

        return lines.reduce((score, line) => {
            const { killerPlayerName, deadPlayerName } = this.getPlayersNamesFromKillEventLine(line);

            if (killerPlayerName === deadPlayerName && player == killerPlayerName)
                return score - 1;

            if (killerPlayerName === player)
                return score + 1;

            if (killerPlayerName === '<world>' && deadPlayerName === player)
                return score - 1;

            return score;
        }, 0);

    }


    public getAllKillsFromGame(game: string): number {

        const lines = this.getGameLines(game);

        return lines.reduce((kills, line) => {

            const { killerPlayerName, deadPlayerName } = this.getPlayersNamesFromKillEventLine(line);

            if (line.includes('killed') && (killerPlayerName != deadPlayerName))
                return kills + 1;
            else
                return kills;
        }, 0);

    }

    public proccessGeneralRank(fileContent: string): IRank[] {
        const players = [...this.getAllPlayersFromGame(fileContent)];
        return players.map(player => ({
            player,
            kills: this.getPlayerScore(player, fileContent)
        }))
            .sort((a, b) => b.kills - a.kills);
    }

    public parseGame(game: string, id: number): IGame {

        const players = [...this.getAllPlayersFromGame(game)];
        const total_kills = this.getAllKillsFromGame(game);

        let game_parsed = {
            total_kills,
            players,
            kills: {}
        }

        players.forEach(player => {
            game_parsed = {
                ...game_parsed,
                kills: {
                    ...game_parsed.kills,
                    [`${player}`]: this.getPlayerScore(player, game)
                }
            }
        });

        return {
            [`game_${id}`]: game_parsed
        };
    }

    public proccessGameLogFile(file: string): IGame[] {
        const games = this.getAllGames(file);
        return games.map((game, index) => this.parseGame(game, index));
    }
}

export default new Game();