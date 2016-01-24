var express = require('express')
  , router = express.Router()
  , Innovation = require('../models/Innovation')
  , Vote = require('../models/Vote')
  , Round = require('../models/Round')
  , Cookies = require('cookies')
  , moment = require('moment');

// we should set this with a cookie on get /
var CurrentRound;

router.get('/', function(req, res) {
  var cookies = new Cookies( req, res,  [process.env.COOKIE_KEY]);
  var round = new Round();

  round.findInnovationsForThisRound(function (err, currentRound) {
    // console.log(currentRound);
    if (currentRound && currentRound[0] && currentRound[0].competitors) {
      currentRound = currentRound[0];
      var competitors = currentRound.competitors;
      Innovation.find( { name: {$in: competitors}  }, function (err, innovations) {
        if (err) console.error(err);
        if (cookies.get('voted')) {
          innovations.push({ votedCookie: cookies.get('voted') });
        }
        currentRound.competitors = innovations;
        res.send(currentRound);
      });

    }
  });
});

router.post('/*', function(req, res) {
    var round = new Round();
    var cookies = new Cookies( req, res, [process.env.COOKIE_KEY]);
    var votedForInnovation = req.params[0].replace(/-/, ' ');

    round.findInnovationsForThisRound(function (err, currentRound) {
      console.log('this is the currentRound ', currentRound);
      currentRound = currentRound[0];
      var ip = req.headers['x-forwarded-for'] ||
       req.connection.remoteAddress ||
       req.socket.remoteAddress ||
       req.connection.socket.remoteAddress;


      if (!cookies.get('voted')) {
          var vote = new Vote ({
              votedFor: votedForInnovation,
              round: currentRound.name,
              ip: ip
          });

          var expiryDate = new Date(currentRound.ending_date);
          var today = new Date();
          var timeLeft = expiryDate - today;
          cookies.set('voted', votedForInnovation, {maxAge: timeLeft});
          vote.save(function (err, vote) {
              res.send('Thank you for voting, please check back ' + moment(currentRound['ending_date']).add('days', 1).format('MMMM D'));
          });
      } else {

          res.send('Sorry, you already voted! Please check back ' + moment(currentRound['ending_date']).add('days', 1).format('MMMM D'));
      }
    });

});

module.exports = router;
