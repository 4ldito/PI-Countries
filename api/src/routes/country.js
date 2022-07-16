const { Router } = require('express');
const { Country, Activity, cache } = require('../db');

const axios = require('axios');
const API_ALL_URL = 'https://restcountries.com/v3/all';

const countryRoute = Router();

const getAllCountries = async () => {
    const { data } = await axios.get(API_ALL_URL);
    const countriesProps = data.map((element) => {
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
}

countryRoute.get('/', async (req, res, next) => {
    const { name } = req.query;

    try {
        if (!cache.allCountries) await getAllCountries();

        if (name) {
            const filterCountries = cache.allCountries.filter(country => country.name === name)
            return res.status(200).send(filterCountries);
        }

        res.status(201).send('Datos agregados con exito');

    } catch (error) {
        next(error);
    }
});

countryRoute.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    if (!id) next(new Error('El ID es invalido'));

    try {
        if (!cache.allCountries) await getAllCountries();
        const country = await Country.findByPk(id, { include: Activity });

        if (!country) next(new Error('El ID es invalido'));
        res.status(200).send('Se encontro el pais' + country);

    } catch (error) {
        next(error);
    }
});



module.exports = { countryRoute, getAllCountries };
