var express = require('express')
  , router = express.Router()
  , Innovation = require('../models/Innovation')
  , Vote = require('../models/Vote')
  , Round = require('../models/Round')
  , Cookies = require('cookies');

// we should set this with a cookie on get /
var CurrentRound;

router.get('/', function(req, res) {
  var cookies = new Cookies( req, res,  [process.env.COOKIE_KEY]);
  var round = new Round();

  round.findInnovationsForThisRound(function (err, currentRound) {
    // console.log(currentRound)
    if (currentRound && currentRound[0] && currentRound[0].competitors) {
      // console.log('hello world!)');
      // console.log(currentRound[0]);
      // console.log(currentRound[0].competitors);
      CurrentRound = currentRound[0];
      var competitors = currentRound[0].competitors;
      console.log(competitors);
      Innovation.find( { name: {$in: competitors}  }, function (err, innovations) {
        if (err) console.error(err);
        console.log(innovations);
        res.send(innovations);
      });

    }
  });
  // Innovation.find(function (err, innovations) {
  //   if (err) return console.error(err);
  //       if (cookies.get('voted'), {signed: true}) {
  //           innovations.push({ votedCookie: cookies.get('voted', {signed: true}) });
  //       }

  //       res.send(innovations);
  //   });
});

// Domestic animals page
router.post('/*', function(req, res) {
    var cookies = new Cookies( req, res, [process.env.COOKIE_KEY]);
    var votedForInnovation = req.params[0].replace(/-/, ' ');
    var round = CurrentRound._id;


    var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;


    if (!cookies.get('voted',  { signed: true })) {
        var vote = new Vote ({
            votedFor: votedForInnovation,
            round: round,
            ip: ip
        });
        cookies.set('voted', votedForInnovation, { signed: true } );
        vote.save(function (err, vote) {
            res.send('Thank you for voting, please check back ' + CurrentRound.ending_date);
        });
    } else {
        res.send('Sorry, you already voted! Please check back ' + CurrentRound.ending_date);
    }

});

// Wild animals page
// router.get('/wild', function(req, res) {
//   res.send('Wolf, Fox, Eagle');
// })

module.exports = router;
