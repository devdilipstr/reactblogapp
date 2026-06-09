const mongoose = require('mongoose');

const showcaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

showcaseSchema.index({ isActive: 1 });

module.exports = mongoose.model('Showcase', showcaseSchema);
