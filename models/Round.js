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
  // today = today.toISOString();
  // console.log(today);
  // this.model('Round').find({}, function (err, result){
  //   console.log('these are the rounds that exist, ', result);
  // })
  // "starting_date" : ISODate("2015-12-13T18:36:56.280Z"), "end_date" : ISODate("2015-12-19T18:35:19Z")

  // compared to Tue Dec 15 2015 00:00:00 GMT-0500 (EST)

  // Sun Dec 13 2015 14:23:20 GMT-0500 (EST)
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
