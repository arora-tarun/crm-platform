const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
console.log('dashboardController:', dashboardController);

router.get('/recent', dashboardController.getRecentCustomers);
router.get('/stats', dashboardController.getDashboardSummary);

module.exports = router;
