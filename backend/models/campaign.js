const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Active', 'Paused', 'Draft'], default: 'Draft' },
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
