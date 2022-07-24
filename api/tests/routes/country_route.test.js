const request = require('supertest');
const app = require('../../src/app.js');
const { conn } = require('../../src/db.js');

describe('Country Routes', () => {
    beforeAll(async () => {
        await conn.sync({ force: true });
    })

    describe('GET /api/countries', () => {
        it('should call the api and get all countries and return them', async () => {
            const res = await request(app).get('/api/countries/');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(250);
        });

        it('should search and return countries that match with the name in the query', async () => {
            const res = await request(app).get('/api/countries?name=Argentina');
            expect(res.body.length).toBe(1);

            const res2 = await request(app).get('/api/countries?name=Tur');
            expect(res2.body.length).toBe(3);
        });

        it('should search and return one country that match with the id', async () => {
            const res = await request(app).get('/api/countries/ARG');
            expect(res.body.id).toBe('ARG');
            expect(res.body.name).toBe('Argentina');

            const res2 = await request(app).get('/api/countries/COL');
            expect(res2.body.id).toBe('COL');
            expect(res2.body.name).toBe('Colombia');
        });

        it('should return an error if the id doesnt exists', async () => {
            const res = await request(app).get('/api/countries/ART');
            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('El id es invalido');

        });

    });

    afterAll(async () => {
        await conn.sync({ force: true });
        await conn.close();
    });
})



