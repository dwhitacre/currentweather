var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function (req, res) {
	res.json({ message: 'Page Loaded'});
});

module.exports = router;