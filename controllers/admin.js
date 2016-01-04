var Vote = require('../models/Vote')
  , Round = require('../models/Round')
  , Cookies = require('cookies')
  , Wild = require('../models/Wild')
  , express = require('express')
  , router = express.Router()
  , Innovation = require('../models/Innovation');



router.get('/', function(req, res) {
  var vote = new Vote();
  var round = new Round();
  var user = new User();
  user.find({

  });
  round.findThisRound(function (err, currentRound) {
    console.log('hello from admin ', currentRound[0]);
    if (currentRound && currentRound[0] && currentRound[0].competitors) {
      // CurrentRound = currentRound[0];

      vote.findVotesForThisRound(currentRound[0], function(err, votes) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(votes);
        res.send(votes);
      });




    }
  });

});


module.exports = router;
