const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  method: String,
  url: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);