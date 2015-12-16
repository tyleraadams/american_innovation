var express = require('express')
  , router = express.Router()
  , Innovation = require('../models/Innovation')
  , Vote = require('../models/Vote')
  , Round = require('../models/Round')
  , Cookies = require('cookies')
  , Wild = require('../models/Wild');

// we should set this with a cookie on get / or use an ENV varaible
var CurrentRound;

router.post('/*', function(req, res) {
    var cookies = new Cookies( req, res, [process.env.COOKIE_KEY]);
    var votedForInnovation = req.params[0].replace(/-/, ' ');
    // var round = CurrentRound._id;


    var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;


    if (!cookies.get('voted',  { signed: true })) {
        // console.log(req);
        var input = req.body;
        input.ip = ip;
        var wild = new Wild(input);
        cookies.set('voted', wild.name, { signed: true } );
        wild.save(function (err, vote) {
            res.send('Thank you for voting, please check back ' /*+ CurrentRound.ending_date*/);
        });
    } else {
        res.send('Sorry, you already voted! Please check back ' /*+ CurrentRound.ending_date*/);
    }

});


module.exports = router;
