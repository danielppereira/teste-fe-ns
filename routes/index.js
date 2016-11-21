var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var parseurl = require('parseurl')
var session = require('express-session');

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

router.use(function (req, res, next) {
  var views = req.session.views;

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
})

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.sendFile(path.normalize(__dirname + 'public/products.json'));
	var json = JSON.parse(fs.readFileSync('public/json/products.json', 'utf8'));
 // res.send('you viewed this page ' + req.session.views['/'] + ' times')
	
  res.render('index', { title: 'Express', json: json });
});


module.exports = router;