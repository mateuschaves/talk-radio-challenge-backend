import { Game, File } from '../../src/helpers';
import { GameMock } from '../../src/assets/mocks';

describe('Game', () => {
    it('should be able return all player from a game', () => {
        const players = Game.getAllPlayersFromGame(GameMock);
        expect(players.size).toBe(2);
        expect(players.has('Isgalamido')).toBe(true);
        expect(players.has('Mocinha')).toBe(true);
    });
});