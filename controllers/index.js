var express = require('express')
  , router = express.Router()
  , innovations = require('./innovations')
  , wild = require('./wild');


// router.use('/innovations', innovations);
router.use('/wild', wild);

router.get('/', function(req, res) {
  var cookies = new Cookies( req, res,  [process.env.COOKIE_KEY]);
  var round = new Round();

  round.findInnovationsForThisRound(function (err, currentRound) {
    if (currentRound && currentRound[0] && currentRound[0].competitors) {
      CurrentRound = currentRound[0];
      var competitors = currentRound[0].competitors;
      Innovation.find( { name: {$in: competitors}  }, function (err, innovations) {
        if (err) console.error(err);
        res.render('index', innovations);
      });

    }
  });
});

// router.get('/about', function(req, res) {
//   res.send('Learn about us')
// })

module.exports = router;
