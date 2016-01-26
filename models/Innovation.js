var mongoose = require('mongoose');

var InnovationSchema = new mongoose.Schema({
  name: String,
  audio: String,
  description: String,
  eliminated: Boolean,
  image: {
    src: String,
    thumb: String,
    width: Number,
    height: Number
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Innovation', InnovationSchema);
