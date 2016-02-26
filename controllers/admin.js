var Vote = require('../models/Vote')
  , Round = require('../models/Round')
  , Cookies = require('cookies')
  , User = require('../models/User')
  , Wild = require('../models/Wild')
  , express = require('express')
  , router = express.Router()
  , Innovation = require('../models/Innovation')
  , bcrypt = require('bcrypt')
  , path = require('path');



router.get('/', function(req, res) {
  var cookies = new Cookies( req, res,  [process.env.COOKIE_KEY]);
  var isAuthenticated = cookies.get('isAuthenticated', { signed: true });
  if (isAuthenticated) {
     res.sendFile(path.join(__dirname, '../public', 'admin.html'));
   } else {
    res.redirect('admin/login');
   }
});

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.post('/login', function (req, res) {
  var cookies = new Cookies( req, res,  [process.env.COOKIE_KEY]);
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({username: username}, function(err, user) {
    if (err) {
      return console.error(err);
    }
    if (user) {
      bcrypt.compare(password, user.password, function(err, isAuthenticated) {
        if (isAuthenticated) {

          cookies.set('isAuthenticated', username, { maxAge: 900000 });
          res.redirect("/admin");
          // });
        } else {
          res.send('Incorrect login credentials, please contact admin');
        }
      });
    } else {
      res.send('There is no user by that name, contact admin');
    }
  });
});

router.get('/results', function(req, res) {
  var vote = new Vote();
  var round = new Round();
  // var user = new User();
  var cookies = new Cookies( req, res,  [process.env.COOKIE_KEY]);
  var isAuthenticated = cookies.get('isAuthenticated', { signed: true });
  if (isAuthenticated) {
    round.findInnovationsForThisRound(function (err, currentRound) {
      if (currentRound && currentRound[0] && currentRound[0].competitors) {
        vote.findVotesForThisRound(currentRound[0], function(err, votes) {
          if (err) {
            console.error(err);
            return;
          }
          var packagedResults = {
            votes: votes
          };

          res.send(packagedResults);
        });
      }
    });
  } else {
    res.send('You are not authenticated');
  }
});






module.exports = router;
