const request = require('supertest');
const app = require('../../src/app.js');
const { Activity, conn } = require('../../src/db.js');

const activity1 = {
    name: "Sky",
    difficulty: 2,
    duration: 2,
    season: "Winter",
    countries: ["ARG"]
}

const activity2 = {
    name: "Trekking",
    difficulty: 2,
    duration: 3,
    season: "Winter",
    countries: ["ARG"]
}

const activity3 = {
    name: "Alpinismo",
    difficulty: 2,
    duration: 2,
    season: "Winter",
    countries: ["ARG"]
}

const activity4 = {
    name: "Surfing",
    difficulty: 2,
    duration: 2,
    season: "Summer",
    countries: ["USA"]
}

describe('Activity Routes', () => {
    beforeAll(async () => {
        try {
            await conn.sync({ force: true });
        } catch (error) {
            console.error(error);
        }
    })

    // beforeEach(async () => {
    //     await conn.close();
    //     await conn.sync({ force: true });
    // })
    describe('GET /api/activities', () => {
        it('should return empty array if the database is empty', async () => {
            const res = await request(app).get('/api/activities/');
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(0);
            expect(Array.isArray(res.body)).toBeTruthy();
        });

        it('should return all activities if the database isnt empty', () => {
            Promise.all([
                Activity.create(activity1),
                Activity.create(activity2),
                Activity.create(activity3)
            ]).then(async (activities) => {
                const res = await request(app).get('/api/activities/');
                expect(res.statusCode).toBe(200);
                expect(res.body.length).toBe(3);
                expect(Array.isArray(res.body)).toBeTruthy();
                expect(activities[0].name).toBe('Sky');
            })
        });
    });

    describe('POST /api/activities', () => {
        it('should not create the Ability if the body is empty', async () => {
            let res;
            try {
                res = await request(app)
                    .post('/api/activities/')
                    .send({});
            } catch (error) {
                console.log(error)
            }

            expect(res.statusCode).toBe(500);
            expect(res.body.error).toBe('Wrong data');
        });

        it('should create the Ability if the body is correct', async () => {
            try {
                const res = await request(app)
                    .post('/api/activities/')
                    .send({
                        name: "Surfing",
                        difficulty: 2,
                        duration: 2,
                        season: "Summer",
                        countries: ["USA"]
                    });
                expect(res.statusCode).toBe(201);
                expect(activity4.name).toBe(res.body.name);
            } catch (error) {
                console.log('error', error)
            }
        });
    })

    afterAll(async () => {
        // await conn.sync({ force: true });
        conn.close();

    });
})



