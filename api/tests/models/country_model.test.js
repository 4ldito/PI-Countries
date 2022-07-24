const { Country, conn } = require('../../src/db.js');

describe('Country Model', () => {
    beforeEach(async () => {
        await conn.sync({ force: true });
    });

    it('should not create the Country if the body is empty', async () => {
        expect.assertions(1);
        try {
            await Country.create({});
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    it('should create the Country if the body is correct', async () => {
        const country = {
            id: "AAA",
            name: 'NewArgentina',
            capital: 'Buenos Aires',
            flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
            continent: "America",
            subregion: "South America",
            area: "9999",
            population: "1000000",
        }
        const createdCountry = await Country.create(country);
        expect(createdCountry.toJSON()).toHaveProperty('id', 'AAA');
        expect(createdCountry.toJSON()).toHaveProperty('name', 'NewArgentina');
        expect(createdCountry.toJSON()).toHaveProperty('capital', 'Buenos Aires');
        expect(createdCountry.toJSON()).toHaveProperty('flag', 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg');
        expect(createdCountry.toJSON()).toHaveProperty('continent', 'America');
        expect(createdCountry.toJSON()).toHaveProperty('subregion', 'South America');
        expect(createdCountry.toJSON()).toHaveProperty('area', 9999);
        expect(createdCountry.toJSON()).toHaveProperty('population', 1000000);
    });

    it('should not create the Country if the ID already exists', async () => {
        expect.assertions(1);
        const country = {
            id: "AAB",
            name: 'NewArgentina',
            capital: 'Buenos Aires',
            flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
            continent: "America",
            subregion: "South America",
            area: "9999",
            population: "1000000",
        }
        try {
            await Country.create(country);
            await Country.create(country);
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    it('should create the Country if the area, population or subregion are empty', async () => {
        const country = {
            id: "AAC",
            name: 'NewArgentina',
            capital: 'Buenos Aires',
            flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
            continent: "America",
        }

        const createdCountry = await Country.create(country);
        expect(createdCountry.toJSON()).toHaveProperty('id', 'AAC');
        expect(createdCountry.toJSON()).toHaveProperty('name', 'NewArgentina');
        expect(createdCountry.toJSON()).toHaveProperty('capital', 'Buenos Aires');
        expect(createdCountry.toJSON()).toHaveProperty('flag', 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg');
        expect(createdCountry.toJSON()).toHaveProperty('continent', 'America');
        expect(createdCountry.toJSON()).toHaveProperty('population', null);
        expect(createdCountry.toJSON()).toHaveProperty('area', null);
    });

    it('should get all Countries from database', async () => {
        const country = {
            id: "AAA",
            name: 'NewArgentina',
            capital: 'Buenos Aires',
            flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
            continent: "America",
        }

        const country2 = {
            id: "AAB",
            name: 'NewArgentina',
            capital: 'Buenos Aires',
            flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
            continent: "America",
        }

        const country3 = {
            id: "AAC",
            name: 'NewArgentina',
            capital: 'Buenos Aires',
            flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
            continent: "America",
        }

        await Country.create(country);
        await Country.create(country2);
        await Country.create(country3);
        const countries = await Country.findAll();
        expect(countries.length).toEqual(3);
    });

    it('should not create the Country if the id is wrong', async () => {
        expect.assertions(1);
        const country = {
            id: "AAAA",
            name: 'NewArgentina',
            capital: 'Buenos Aires',
            flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
            continent: "America",
        }
        try {
            await Country.create(country);
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    it('should not create the Country if the name, capital, flag or continent are empty', async () => {
        expect.assertions(3);
        const country = {
            id: "AAE",
            capital: 'Buenos Aires',
            flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
            continent: "America",
        }
        const country2 = {
            id: "AAF",
            name: 'newArgentina',
            capital: 'Buenos Aires',
            flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
        }
        const country3 = {
            id: "AAG",
            name: 'NewArgentina',
            flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
            continent: "America",
        }
        try {
            await Country.create(country);
        } catch (error) {
            expect(error.message).toBeDefined();
        }

        try {
            await Country.create(country2);
        } catch (error) {
            expect(error.message).toBeDefined();
        }

        try {
            await Country.create(country3);
        } catch (error) {
            expect(error.message).toBeDefined();
        }

    });

    afterAll(async () => {
        await conn.sync({ force: true });
        conn.close();
    });

});