var express = require('express')
  , router = express.Router()
  , Innovation = require('../models/Innovation')
  , Vote = require('../models/Vote')
  , Round = require('../models/Round')
  , Cookies = require('cookies')
  , Wild = require('../models/Wild')
  , moment = require('moment')
  , formidable = require('formidable');

// we should set this with a cookie on get / or use an ENV varaible
var CurrentRound;

router.post('/*', function(req, res) {
    var cookies = new Cookies( req, res, [process.env.COOKIE_KEY]);
    // var votedForInnovation = req.params[0].replace(/-/, ' ');
    var round = new Round();

      console.log("Received:"+require('util').inspect(req.body,{depth:null}));

      // var form = new formidable.IncomingForm();

      // form.parse(req, function(err, fields, files) {
        // console.log('fields inside form parser ' , fields);
      // res.writeHead(200, {'content-type': 'text/plain'});
      // res.write('received upload:\n\n');
      // res.end(util.inspect({fields: fields, files: files}));
      // });

    // console.log('this is req.body ', req.body, 'this is req', req);
    var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

    round.findInnovationsForThisRound(function (err, currentRound) {
      // console.log(currentRound);
      // if (currentRound && currentRound[0] && currentRound[0].competitors) {
      currentRound = currentRound[0];
      // var competitors = currentRound.competitors;
      // Innovation.find( { name: {$in: competitors}  }, function (err, innovations) {
      //   if (err) console.error(err);
      //   if (cookies.get('voted')) {
      //     innovations.push({ votedCookie: cookies.get('voted') });
      //   }
      //   currentRound.competitors = innovations;
      //   res.send(currentRound);
      // });

    // }

      if (!cookies.get('voted')) {
        var input = req.body;
        // console.log('this is input ', req);
        input.ip = ip;
        var wild = new Wild(input);
        cookies.set('voted', 'wild.name');
        // console.log(cookies.get('voted'))
        wild.save(function (err, vote) {
          res.send('Thank you for voting, please check back ' + moment(currentRound['ending_date']).add('days', 1).format('MMMM D'));
        });
      } else {
        res.send('Sorry, you already voted! Please check back ' + moment(currentRound['ending_date']).add('days', 1).format('MMMM D'));
      }
    });


});


module.exports = router;
