var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/american_innovations');


var fixtures = require('./fixtures');

var Innovation = require('../models/Innovation')
  , Round = require('../models/Round');

var round = new Round();
var innovation = new Innovation();

Round.find({}, function (err, results) {

  if (!results.length) {
    fixtures.rounds.forEach(function(item, index) {
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
