var mongoose = require('mongoose');

var RoundSchema = new mongoose.Schema({
  name: String,
  competitors: Array,
  starting_date: Date,
  ending_date: Date,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Round', RoundSchema);
