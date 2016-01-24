var express = require('express')
  , router = express.Router()
  , innovations = require('./innovations')
  , wild = require('./wild')
  , admin = require('./admin');


router.use('/innovations', innovations);
router.use('/wild', wild);
router.use('/admin', admin);

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// router.get('/about', function(req, res) {
//   res.send('Learn about us')
// })

module.exports = router;
