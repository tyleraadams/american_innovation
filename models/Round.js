var mongoose = require('mongoose');

var RoundSchema = new mongoose.Schema({
  name: String,
  competitors: Array,
  starting_date: Date,
  ending_date: Date,
  updated_at: { type: Date, default: Date.now }
});


RoundSchema.methods.findInnovationsForThisRound = function (cb) {

  // var startDate = new Date(2013, 1, 12)
  // , endDate   = new Date(2013, 1, 15)
  var today  = new Date();
  console.log(today);
  // , range = moment().range(startDate, endDate);

  // range.contains(date); // false
  return this.model('Round').find({
    starting_date: {
      $lt: today
    }
    ,

    ending_date: {
      $gte: today
    }
  }, cb);
};


module.exports = mongoose.model('Round', RoundSchema);
