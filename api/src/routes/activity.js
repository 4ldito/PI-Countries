const { Router } = require('express');
const { Country, Activity, cache } = require('../db');
const { getAllCountries } = require('./country');

const router = Router();


router.post('/', async (req, res, next) => {
    const { name, difficulty, duration, season, countries } = req.body;

    try {
        if (!name || !difficulty || !duration || !season || !countries) next(new Error('Faltan datos'));
        if (!cache.allCountries) await getAllCountries();
    } catch (error) {
        next(error)
    }

    Activity.create({ name, difficulty, duration, season }).then(activity => {
        countries.forEach(id => {
            Country.findByPk(id).then(country => {
                country.addActivity(activity);
            })
        });
        return res.status(201).send(activity);
    }).catch(error => {
        if (error.name === 'SequelizeUniqueConstraintError') return res.status(500).send('Activity already exists.');
        res.status(500).send(error.message);
    });

});


module.exports = router;
