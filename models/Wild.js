var mongoose = require('mongoose');

var WildSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  innovation: String,
  description: String,
  ip: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wild', WildSchema);
