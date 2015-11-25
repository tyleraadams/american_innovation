var express = require('express')
  , router = express.Router();

router.use('/innovation', require('./animals'))
router.use('/cars', require('./cars'))

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'), { maxAge: yearInMs });
})

router.get('/about', function(req, res) {
  res.send('Learn about us')
})

module.exports = router;
