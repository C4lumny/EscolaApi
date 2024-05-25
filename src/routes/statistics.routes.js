const { Router } = require('express');
const { getStatistics } = require('../controllers/statistics.controllers');

const router = Router();

router.get('/statistics', getStatistics);

module.exports = {
    statisticsRouter: router,
}