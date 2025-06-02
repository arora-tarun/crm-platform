const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// Joi schema to validate request body
const logSchema = Joi.object({
  campaignId: Joi.string().length(24).hex().required(),
  customerId: Joi.string().length(24).hex().required(),
  action: Joi.string().valid('delivered', 'opened', 'clicked').required(),
});

// GET all logs with campaign and customer info populated
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find()
      .populate('campaignId', 'name')
      .populate('customerId', 'name email');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new log with validation
router.post('/', async (req, res) => {
  try {
    // Validate the request body using Joi
    await logSchema.validateAsync(req.body, { abortEarly: false });

    // Create new Log document
    const log = new Log(req.body);

    // Save to database
    const savedLog = await log.save();

    res.status(201).json(savedLog);
  } catch (err) {
    if (err.isJoi) {
      // If validation error, send detailed messages
      const errors = err.details.map(detail => detail.message);
      return res.status(400).json({ errors });
    }
    // Other errors
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
