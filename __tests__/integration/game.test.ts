
import request from 'supertest';
import app from '../../src/app';

describe('Game', () => {

    it('should be able to show a game when the id passed exist', async () => {
        const response = await request(app)
            .get('/game/4');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            "kills": [
                { player: "Zeh", kills: 20 },
                { player: "Isgalamido", kills: 19 },
                { player: "Assasinu Credi", kills: 11 },
                { player: "Dono da Bola", kills: 5 },
            ],
            "players": [
                "Isgalamido",
                "Dono da Bola",
                "Zeh",
                "Assasinu Credi"
            ],
            "total_kills": 100
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