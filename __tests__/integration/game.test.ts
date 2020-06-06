
import request from 'supertest';
import app from '../../src/app';

describe('Game', () => {

    it('should be able to show a game when the id passed exist', async () => {
        const response = await request(app)
            .get('/game/4');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            [`game_${4}`]: {
                "kills": {
                    "Assasinu Credi": 12,
                    "Dono da Bola": 9,
                    "Isgalamido": 19,
                    "Zeh": 20
                },
                "players": [
                    "Isgalamido",
                    "Dono da Bola",
                    "Zeh",
                    "Assasinu Credi"
                ],
                "total_kills": 105
            }
        });
    });

    it('should not be able to show a game when the id passed not exist', async () => {
        const response = await request(app)
            .get('/game/40');

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            message: 'game not found'
        });
    })
});