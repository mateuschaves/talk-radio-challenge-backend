import { Game } from '../../src/helpers';
import { GameMock, GamesMock } from '../../src/assets/mocks';

describe('Game', () => {
    it('should be able return all player from a game', () => {
        const players = Game.getAllPlayersFromGame(GameMock);
        expect(players.size).toBe(2);
        expect(players.has('Isgalamido')).toBe(true);
        expect(players.has('Mocinha')).toBe(true);
    });

    it('should be able to return correct player score', () => {
        [
            { player: 'Isgalamido', score: -9 },
            { player: 'Mocinha', score: 0 }]
            .map(({ player, score }) => expect(Game.getPlayerScore(player, GameMock)).toBe(score));
    });

    it('should not be able to return score of a invalid player name', () => {
        const invalidPlayerName = '<world>';
        try {
            Game.getPlayerScore(invalidPlayerName, GameMock);
        } catch (error) {
            expect(error.message).toBe('<world> is not a player');
        }
    });

    it('should be able to return correct game kills amount', () => {
        expect(Game.getAllKillsFromGame(GameMock)).toBe(9);
    });

    it('should be able to return all games from log file', () => {
        expect(Game.getAllGames(GamesMock).length).toBe(21 + 1);
    });

    it('should not crash when game log file is empty', () => {
        try {
            Game.getAllGames('')
        } catch (error) {
            expect(error.message).toBe('log file is empty')
        }
    });

    it('should be able to parse a game', () => {
        const gameId = 1
        const gameParsed = Game.parseGame(GameMock, gameId);

        expect(gameParsed).toMatchObject({
            [`game_${gameId}`]: {
                total_kills: 9,
                players: ['Isgalamido', 'Mocinha'],
                kills: {
                    'Isgalamido': -9,
                    'Mocinha': 0
                }
            }
        });
    });

    it('should be able to proccess entire game log file', () => {
        const gamesParsed = Game.proccessGameLogFile(GamesMock);
        const games = Game.getAllGames(GamesMock);

        gamesParsed.forEach((game, index) => {
            expect(game).toMatchObject({
                [`game_${index}`]: {
                    total_kills: Game.getAllKillsFromGame(games[index]),
                    players: Game.getAllPlayersFromGame(games[index]),
                }
            });
        });
    });
});