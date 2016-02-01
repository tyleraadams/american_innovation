var schedule = require('node-schedule');


var date = new Date();

// console.log('date!! ', date);
var j = schedule.scheduleJob(date, function(){
  // console.log('The world is going to end today.');
});



var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 0;

var j = schedule.scheduleJob(rule, function(){

  // check once a week what round we are in, set global or environment variable for server so we don't have to keep hitting the database -- maybe this would be a good use case for Redis
  // console.log('The answer to life, the universe, and everything!');
});

module.exports = schedule;
