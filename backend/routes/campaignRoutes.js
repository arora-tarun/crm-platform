const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaign');

router.post('/', campaignController.createCampaign);
router.get('/', campaignController.getAllCampaigns);
router.post('/preview', campaignController.previewAudience);

module.exports = router;
