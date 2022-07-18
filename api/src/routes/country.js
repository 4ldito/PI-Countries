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
            continent: element.continents[0],
            subregion: element.subregion,
            area: element.area,
            population: element.population,
        }
    });

    cache.allCountries = countriesProps;
    Country.bulkCreate(countriesProps);
}

countryRoute.get('/', async (req, res, next) => {
    const { name, order } = req.query;
    try {
        if (!cache.allCountries) await getAllCountries();

        if (order) cache.allCountries.sort((a, b) => b.name.localeCompare(a.name));
        else cache.allCountries.sort((a, b) => a.name.localeCompare(b.name));

        if (name) {
            const filterCountries = cache.allCountries.filter(country => {
                const regex = new RegExp(name, "gmi");
                const isCountry = regex.exec(country.name);
                if (isCountry) {
                    country.index = isCountry.index
                    return country;
                }
            })
            filterCountries.sort((a, b) => a.index - b.index);
            if (filterCountries.length <= 0) {
                filterCountries.push({ error: 'No se encontraron paises' });
            }
            return res.status(200).send(filterCountries);
        }
        res.status(200).send(cache.allCountries);
    } catch (error) {
        next(error);
    }
});

countryRoute.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    if (!id) next(new Error('El ID es requerido'));

    try {
        if (!cache.allCountries) await getAllCountries();
        const country = await Country.findByPk(id, { include: Activity });

        if (!country) next(new Error('El ID es invalido'));
        res.status(200).send(country);

    } catch (error) {
        next(error);
    }
});

countryRoute.get('/continent/:name', async (req, res, next) => {
    const { name } = req.params;
    try {
        if (!cache.allCountries) await getAllCountries();

        if (name) {
            let filterCountries;
            if (name === 'All') filterCountries = cache.allCountries;
            else {
                filterCountries = cache.allCountries.filter(country => {
                    if (country.continent === name) return country;
                });
            }
            // filterCountries.sort((a, b) => a.index - b.index);
            if (filterCountries.length <= 0) {
                filterCountries.push({ error: 'No se encontraron continentes' });
            }
            return res.status(200).send(filterCountries);
        }
        res.status(404).send(new Error('El nombre del continente es requerido'));
    } catch (error) {
        next(error);
    }
});



module.exports = { countryRoute, getAllCountries };
