var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/american_innovations');


var fixtures = require('./fixtures');

var Innovation = require('../models/Innovation')
  , Round = require('../models/Round')
  , User = require('../models/User');


User.find({}, function (err, results) {
  if (!results.length) {
    var bcrypt = require('bcrypt');
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(process.env.ADMIN_PASSWORD, salt, function(err, hash) {
        var user = new User({username: process.env.ADMIN_USERNAME, password: hash});
        user.save();
      });
    });
  }
});


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
