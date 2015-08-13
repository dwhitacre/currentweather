var express = require('express');
var request = require('request');

var router = express.Router();

var API_KEY = '355e806e0c6b3aa9c5c24c36144d073b';

/* GET current weather */
router.get('/:loc', function (req, res) {
	var unit = req.query.unit || false;
	var currWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + API_KEY + '&';
	var	foreWeatherURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID=' + API_KEY + '&cnt=1&'; // need this for daily low and highs

	// add unit to current and forecast weather url
	if (unit.toLowerCase() === 'celsius') {
		currWeatherURL += 'units=metric&';
		foreWeatherURL += 'units=metric&';
	} else if (unit.toLowerCase() === 'fahrenheit') {
		currWeatherURL += 'units=imperial&';
		foreWeatherURL += 'units=imperial&';
	}

	// add location to current weather url
	currWeatherURL += (isNaN(req.params.loc)) ? 'q=' : 'zip=';
	currWeatherURL += req.params.loc;

	// make request for current weather
	request(currWeatherURL, function (err, response, body) {
		if (err) return res.status(500).send({ error: err });
		if (response.statusCode != 200) return res.status(500).send({ error: 'OpenWeatherApp request failed.' });
		var currBody = JSON.parse(body);
		if (currBody.cod == 404) return res.send({ error: 'City/Zip not found.' });

		// make request for forecast weather
		request(foreWeatherURL + 'id=' + currBody.id, function (error, fResponse, fBody) {
			if (error) return res.status(500).send({ error: error });
			if (response.statusCode != 200) return res.status(500).send({ error: 'OpenWeatherApp request failed.' });
			var foreBody = JSON.parse(fBody);
			if (foreBody.cod == 404) return res.send({ error: 'City/Zip not found.' });

			// everything went well, send back json data
			res.json({
				name: currBody.name,
				coor: {
					lon: currBody.coord.lon,
					lat: currBody.coord.lat
				},
				cond: currBody.weather[0].main,
				desc: currBody.weather[0].description,
				icon: currBody.weather[0].icon,
				temp: {
					curr: currBody.main.temp,
					low: foreBody.list[0].temp.min,
					high: foreBody.list[0].temp.max
				}
			});
		});
	});
});

module.exports = router;