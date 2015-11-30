var express = require('express')
  , router = express.Router()
  , Innovation = require('../models/Innovation')
  , Vote = require('../models/Vote')
  , Cookies = require('cookies');

router.get('/', function(req, res) {
    console.log(process.env.COOKIE_KEY);
  var cookies = new Cookies( req, res,  [process.env.COOKIE_KEY]);
  Innovation.find(function (err, innovations) {
    if (err) return console.error(err);
        if (cookies.get('voted'), {signed: true}) {
            innovations.push({ votedCookie: cookies.get('voted', {signed: true}) });
        }

        res.send(innovations);
    });
});

// Domestic animals page
router.post('/*', function(req, res) {
    var cookies = new Cookies( req, res, [process.env.COOKIE_KEY]);
    var votedForInnovation = req.params[0].replace(/-/, ' ');
    var round = 'Round 1';
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
            res.send('Thank you for voting, check back next week!');
        });
    } else {
        res.send('Sorry, you already voted!');
    }

});

// Wild animals page
// router.get('/wild', function(req, res) {
//   res.send('Wolf, Fox, Eagle');
// })

module.exports = router;
