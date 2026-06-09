const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
  }],
  isSystem: {
    type: Boolean,
    default: false, // System roles (admin, user) cannot be deleted
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

roleSchema.index({ name: 1 });

module.exports = mongoose.model('Role', roleSchema);
