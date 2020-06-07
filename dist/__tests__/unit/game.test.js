"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../src/helpers");
const mocks_1 = require("../../src/assets/mocks");
describe('Game', () => {
    it('should be able return all player from a game', () => {
        const players = helpers_1.Game.getAllPlayersFromGame(mocks_1.GameMock);
        expect(players.size).toBe(2);
        expect(players.has('Isgalamido')).toBe(true);
        expect(players.has('Mocinha')).toBe(true);
    });
    it('should be able to return correct player score', () => {
        [
            { player: 'Isgalamido', score: -9 },
            { player: 'Mocinha', score: 0 }
        ]
            .map(({ player, score }) => expect(helpers_1.Game.getPlayerScore(player, mocks_1.GameMock)).toBe(score));
    });
    it('should not be able to return score of a invalid player name', () => {
        const invalidPlayerName = '<world>';
        try {
            helpers_1.Game.getPlayerScore(invalidPlayerName, mocks_1.GameMock);
        }
        catch (error) {
            expect(error.message).toBe('<world> is not a player');
        }
    });
    it('should be able to return correct game kills amount', () => {
        expect(helpers_1.Game.getAllKillsFromGame(mocks_1.GameMock)).toBe(9);
    });
    it('should be able to return all games from log file', () => {
        expect(helpers_1.Game.getAllGames(mocks_1.GamesMock).length).toBe(21 + 1);
    });
    it('should not crash when game log file is empty', () => {
        try {
            helpers_1.Game.getAllGames('');
        }
        catch (error) {
            expect(error.message).toBe('log file is empty');
        }
    });
    it('should be able to parse a game', () => {
        const gameId = 1;
        const gameParsed = helpers_1.Game.parseGame(mocks_1.GameMock, gameId);
        expect(gameParsed).toMatchObject({
            [`game_${gameId}`]: {
                total_kills: 9,
                players: ['Isgalamido', 'Mocinha'],
                kills: [
                    { player: 'Mocinha', kills: 0 },
                    { player: 'Isgalamido', kills: -9 },
                ]
            }
        });
    });
    it('should be able to proccess entire game log file', () => {
        const gamesParsed = helpers_1.Game.proccessGameLogFile(mocks_1.GamesMock);
        const games = helpers_1.Game.getAllGames(mocks_1.GamesMock);
        gamesParsed.forEach((game, index) => {
            expect(game).toMatchObject({
                [`game_${index}`]: {
                    total_kills: helpers_1.Game.getAllKillsFromGame(games[index]),
                    players: helpers_1.Game.getAllPlayersFromGame(games[index]),
                }
            });
        });
    });
});
//# sourceMappingURL=game.test.js.map