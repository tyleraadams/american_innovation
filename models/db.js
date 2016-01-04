var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/american_innovations');


var fixtures = require('./fixtures');

var Innovation = require('../models/Innovation')
  , Round = require('../models/Round')
  , User = require('../models/User');


User.find({}, function (err, results) {

  if (!results.length) {
    // fixtures.rounds.forEach(function(item, index) {

      var bcrypt = require('bcrypt');
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash('B4c0/\/', salt, function(err, hash) {
        // Store hash in your password DB.
          var user = new User({username: 'admin', password: hash});
          user.save();
        });
      });

      round.save(item);
    // });
  }

})


Round.find({}, function (err, results) {

  if (!results.length) {
    fixtures.rounds.forEach(function(item, index) {
       var round = new Round(item);
      round.save(item);
    });
  }

})


Innovation.find({}, function (err, results) {
  if (!results.length) {
    fixtures.innovations.forEach(function(item, index) {
      console.log('!! !', item);
      var innovation = new Innovation(item);
      innovation.save(item);
    });
  }

})
// fixtures.innovation.forEach(function(item) {
//   round.save(item);
// });


// function insertFixtures (collection) {
//   Collection.
// }
