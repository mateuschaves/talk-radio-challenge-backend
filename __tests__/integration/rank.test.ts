
import request from 'supertest';
import app from '../../src/app';

describe('Rank', () => {

    it('should be able to return a general rank', async () => {
        const response = await request(app)
            .get('/rank/general');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});