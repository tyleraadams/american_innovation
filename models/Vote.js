var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
  votedFor: String,
  round: String,
  ip: String,
  updated_at: { type: Date, default: Date.now }
});



VoteSchema.methods.findVotesForThisRound = function (currentRound, cb) {
  // var startDate = new Date(2013, 1, 12)
  // , endDate   = new Date(2013, 1, 15)
  // String.isString(currentRound._id);
  // console.log('here is your current round inside model method for vote: ', currentRound._id, 'typeof is ', typeof currentRound._id.toString());
  // var today  = new Date();
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
  // var aggregate = newAggregate()
  // console.log(this.model('Vote'));
  return this.model('Vote').aggregate( [
    {
      $match: {
        round: currentRound._id.toString()
      }
    }, {
      $group: {
        _id: '$votedFor',
        count: {
          $sum: 1
        }
      }
    }
    ] , cb);


};
module.exports = mongoose.model('Vote', VoteSchema);


