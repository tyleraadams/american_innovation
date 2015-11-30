var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
  votedFor: String,
  round: String,
  ip: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', VoteSchema);
