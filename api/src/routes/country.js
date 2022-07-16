const { Router } = require('express');
const { Country } = require('../db');
const { cache } = require('../db');
const axios = require('axios');
const API_ALL_URL = 'https://restcountries.com/v3/all';

const router = Router();

router.get('/', async (req, res) => {
    try {
        if (cache.allCountries) {
            console.log(cache)
            res.send('Ya están los datos');
        } else {
            const { data } = await axios.get(API_ALL_URL);
            const countriesProps = data.map((element, index) => {
                return {
                    id: element.cca3,
                    name: element.name.common,
                    capital: element.capital ? element.capital[0] : 'This country doesn\'t have capital.',
                    flag: element.flags[0],
                    continent: element.region,
                    subregion: element.subregion,
                    area: element.area,
                    population: element.population,
                }
            });
            cache.allCountries = countriesProps;
            Country.bulkCreate(countriesProps);
            res.status(201).send('Datos agregados con exito');
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const { name, capital, flag, continent, subregion, area, population } = req.body;

    console.log(Country)
    try {
        if (!name || !capital || !flag || !continent) next(new Error('Datos obligatorios requeridos.'));
        const a = await Country.create({ name, capital, flag, continent, subregion, area, population });
        console.log(a)
        res.send('Datos agregados con exito')
    } catch (error) {
        next(error);
    }
});


module.exports = router;
