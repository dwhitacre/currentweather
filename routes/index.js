var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function (req, res) {
	res.json({ message: 'Page Loaded'});
});

/* GET weather icon */
router.get('/icon/:iconid', function (req, res) {
	
});

module.exports = router;