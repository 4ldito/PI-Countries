const { Activity, conn } = require('../../src/db.js');

describe('Activity Model', () => {
    beforeEach(async () => {
        await conn.sync({ force: true });
    });

    it('should not create the Ability if the body is empty', async () => {
        expect.assertions(1);
        try {
            await Activity.create({});
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    it('should create the Ability if the body is correct', async () => {
        const act = {
            name: "Sky",
            difficulty: 2,
            duration: 2,
            season: "Winter",
            countries: ["ARG"]
        }
        const createdActivity = await Activity.create(act);
        expect(createdActivity.toJSON()).toHaveProperty('name', 'Sky');
        expect(createdActivity.toJSON()).toHaveProperty('difficulty', 2);
        expect(createdActivity.toJSON()).toHaveProperty('duration', 2);
        expect(createdActivity.toJSON()).toHaveProperty('season', 'Winter');
    });

    it('should not create the Ability if the name already exists', async () => {
        expect.assertions(1);
        const act = {
            name: "Sky2",
            difficulty: 2,
            duration: 2,
            season: "Winter",
            countries: ["ARG"]
        }
        try {
            await Activity.create(act);
            await Activity.create(act);
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    it('should not create the Ability if the season is wrong', async () => {
        expect.assertions(1);
        const act = {
            name: "Sky3",
            difficulty: 2,
            duration: 2,
            season: "wrong",
            countries: ["ARG"]
        }
        try {
            await Activity.create(act);
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    it('should get all Abilities from database', async () => {
        const act = {
            name: "Sky4",
            difficulty: 2,
            duration: 2,
            season: "Winter",
            countries: ["ARG", "COL"]
        }
        const act2 = {
            name: "Trekking",
            difficulty: 4,
            duration: 2,
            season: "Winter",
            countries: ["ARG", "VEN"]
        }
        const act3 = {
            name: "Alpinismo",
            difficulty: 2,
            duration: 3,
            season: "Winter",
            countries: ["ARG"]
        }
        await Activity.create(act);
        await Activity.create(act2);
        await Activity.create(act3);
        const activities = await Activity.findAll();
        expect(activities.length).toEqual(3);
    });

    afterAll(async () => {
        await conn.sync({ force: true });
        conn.close();
    });

});