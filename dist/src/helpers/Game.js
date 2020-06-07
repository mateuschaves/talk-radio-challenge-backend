"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    getAllGames(fileContent) {
        if (fileContent.length)
            return fileContent.split('InitGame');
        else
            throw new Error('log file is empty');
    }
    getAllPlayersFromGame(game) {
        let players = new Set();
        const lines = this.getGameLines(game);
        const linesWithKillEvent = lines.filter(line => line.search('Kill') > 0);
        linesWithKillEvent.forEach(line => {
            const { deadPlayerName, killerPlayerName } = this.getPlayersNamesFromKillEventLine(line);
            if (killerPlayerName != '<world>')
                players.add(killerPlayerName);
            players.add(deadPlayerName);
        });
        return players;
    }
    getGameLines(game) {
        return game.split(/\r\n|\r|\n/g);
    }
    getPlayersNamesFromKillEventLine(line) {
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
    getPlayerScore(player, game) {
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
    getAllKillsFromGame(game) {
        const lines = this.getGameLines(game);
        return lines.reduce((kills, line) => {
            const { killerPlayerName, deadPlayerName } = this.getPlayersNamesFromKillEventLine(line);
            if (line.includes('killed') && (killerPlayerName != deadPlayerName))
                return kills + 1;
            else
                return kills;
        }, 0);
    }
    proccessGeneralRank(fileContent) {
        const players = [...this.getAllPlayersFromGame(fileContent)];
        return players.map(player => ({
            player,
            kills: this.getPlayerScore(player, fileContent)
        }))
            .sort((a, b) => b.kills - a.kills);
    }
    parseGame(game, id) {
        const players = [...this.getAllPlayersFromGame(game)];
        const total_kills = this.getAllKillsFromGame(game);
        let game_parsed = {
            total_kills,
            players,
            kills: players.map(player => ({
                player,
                kills: this.getPlayerScore(player, game)
            }))
                .sort((a, b) => b.kills - a.kills)
        };
        return {
            [`game_${id}`]: game_parsed
        };
    }
    proccessGameLogFile(file) {
        const games = this.getAllGames(file);
        return games.map((game, index) => this.parseGame(game, index));
    }
}
exports.default = new Game();
//# sourceMappingURL=Game.js.map