var express = require('express')
  , router = express.Router()
  , innovations = require('./innovations');


router.use('/innovations', innovations);

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'), { maxAge: yearInMs });
});

// router.get('/about', function(req, res) {
//   res.send('Learn about us')
// })

module.exports = router;
