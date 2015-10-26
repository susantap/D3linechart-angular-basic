var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./public/index.html')
});

/**
 * Funtion to get the chart Data
 */
router.get('/chart', function(req, res, next) {
//Generate some random numbers form 1 to 100
  var data = [];
  for(var i=1; i <=10; i++ )
  {
    var obj = {
      time:i,
      frequency: Math.floor((Math.random() * 100) + 1)
    }
    data.push(obj)

  }
  res.send(data);
});

module.exports = router;
