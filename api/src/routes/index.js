const { Router } = require('express');
const { countryRoute } = require('./country');
const activityRoute = require('./activity');

const router = Router();

router.use('/countries', countryRoute)
router.use('/activities', activityRoute)

module.exports = router;
