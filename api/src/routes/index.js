const { Router } = require('express');
const countryRoute = require('./country');
const activityRoute = require('./activity');

const router = Router();

router.use('/country', countryRoute)
router.use('/activity', activityRoute)

module.exports = router;
