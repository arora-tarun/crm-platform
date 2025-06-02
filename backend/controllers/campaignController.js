const Campaign = require('../models/Campaign');

// Create campaign
exports.createCampaign = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const campaign = new Campaign({ name, description, status });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign', error });
  }
};

// Get all campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error });
  }
};
