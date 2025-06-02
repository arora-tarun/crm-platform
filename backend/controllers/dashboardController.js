// backend/controllers/dashboardController.js

const Customer = require('../models/Customer');
const Campaign = require('../models/Campaign');

async function getRecentCustomers(req, res) {
  try {
    const recentCustomers = await Customer.find().sort({ createdAt: -1 }).limit(5);
    res.json(recentCustomers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recent customers' });
  }
}

async function getDashboardSummary(req, res) {
  try {
    const totalCustomers = await Customer.countDocuments();
    const activeCampaigns = await Campaign.countDocuments({ status: 'active' });
    const deliveredMessages = Math.floor(Math.random() * 10000) + 1000;

    res.json({
      totalCustomers,
      activeCampaigns,
      deliveredMessages,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard summary' });
  }
}

module.exports = {
  getRecentCustomers,
  getDashboardSummary,
};
