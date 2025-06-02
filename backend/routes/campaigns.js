const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

const campaignSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  status: Joi.string().valid('active', 'paused', 'completed').required(),
  targetSegments: Joi.array().items(Joi.string()).optional()
});

// GET all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new campaign with validation
router.post('/', async (req, res) => {
  try {
    await campaignSchema.validateAsync(req.body);

    const campaign = new Campaign(req.body);
    const savedCampaign = await campaign.save();

    res.status(201).json(savedCampaign);
  } catch (err) {
    res.status(400).json({ error: err.details ? err.details[0].message : err.message });
  }
});

module.exports = router;
