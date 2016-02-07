var express = require('express')
  , router = express.Router()
  , Innovation = require('../models/Innovation')
  , Vote = require('../models/Vote')
  , Round = require('../models/Round')
  , Cookies = require('cookies')
  , Wild = require('../models/Wild')
  , moment = require('moment');

// we should set this with a cookie on get / or use an ENV varaible
var CurrentRound;

router.post('/*', function(req, res) {
    var cookies = new Cookies( req, res, [process.env.COOKIE_KEY]);
    var round = new Round();

    var ip = req.ip;

          // cookies.set('voted', votedForInnovation, {maxAge: timeLeft});
    round.findInnovationsForThisRound(function (err, currentRound) {
      currentRound = currentRound[0];

      if (!cookies.get('voted:round2')) {
        var expiryDate = new Date(currentRound.ending_date);
        var today = new Date();
        var timeLeft = expiryDate - today;
        var input = req.body;
        input.ip = ip;
        var wild = new Wild(input);
        cookies.set('voted:round2', 'wild', { maxAge: timeLeft });
        wild.save(function (err, vote) {
          res.send('Thank you for voting, please check back ' + moment(currentRound['ending_date']).add('days', 1).format('MMMM D'));
        });
      } else {
        res.send('Sorry, you already voted! Please check back ' + moment(currentRound['ending_date']).add('days', 1).format('MMMM D'));
      }
    });


});


module.exports = router;
