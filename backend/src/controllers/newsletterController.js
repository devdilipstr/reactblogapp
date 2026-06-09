const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Newsletter.findOne({ email });

    if (existing) {
      if (existing.isActive) {
        return res.status(400).json({ success: false, message: 'Already subscribed' });
      }
      existing.isActive = true;
      await existing.save();
      return res.json({ success: true, message: 'Resubscribed successfully' });
    }

    await Newsletter.create({ email });
    res.status(201).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to subscribe' });
  }
};

exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to unsubscribe' });
  }
};

exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, subscribers, total: subscribers.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers' });
  }
};
