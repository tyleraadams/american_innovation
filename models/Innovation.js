var mongoose = require('mongoose');

var InnovationSchema = new mongoose.Schema({
  name: String,
  votes: Array,
  description: String,
  eliminated: Boolean,
  image: String,
  thumb: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Innovation', InnovationSchema);
