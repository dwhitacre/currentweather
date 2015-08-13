var express = require('express');
var app		= express();
var websrv 	= require('./routes/websrv');

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));	
app.use('/api', websrv);

app.listen(port);
console.log('Starting server on port ' + port);