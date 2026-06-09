const Showcase = require('../models/Showcase');

exports.getActiveShowcases = async (req, res) => {
  try {
    const showcases = await Showcase.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, showcases });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch showcases' });
  }
};

exports.createShowcase = async (req, res) => {
  try {
    const showcase = await Showcase.create(req.body);
    res.status(201).json({ success: true, showcase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateShowcase = async (req, res) => {
  try {
    const showcase = await Showcase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!showcase) {
      return res.status(404).json({ success: false, message: 'Showcase not found' });
    }

    res.json({ success: true, showcase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteShowcase = async (req, res) => {
  try {
    const showcase = await Showcase.findByIdAndDelete(req.params.id);

    if (!showcase) {
      return res.status(404).json({ success: false, message: 'Showcase not found' });
    }

    res.json({ success: true, message: 'Showcase deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete showcase' });
  }
};

exports.getAllShowcases = async (req, res) => {
  try {
    const showcases = await Showcase.find().sort({ createdAt: -1 });
    res.json({ success: true, showcases });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch showcases' });
  }
};
