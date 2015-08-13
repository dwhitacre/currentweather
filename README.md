# currentweather
open weather app api facade, front end web app
#### dependencies
nodejs, express, request
#### setup
* download the zip, or fork the repo.
* run this in the directory - node server.js
* open up webpage on given port (default 8080)

### api
##### GET current weather data
* /api/:location?unit=fahrenheit
* :location can be city name or zip
* unit is optional (default is kelvin)
* example: /api/columbus?unit=fahrenheit
* example: /api/columbus

###### Response
* name - name of the city/zip
* coor.lon - longitude of the city/zip
* coor.lat - latitude of the city/zip
* cond - current condition
* desc - more detailed description of cond
* icon - associated icon name to cond. (icons located in /img)
* temp.curr - current temperature
* temp.low - forecast low temperature
* temp.high - forecast high temperature
```
{
    "name": "Columbus",
    "coor": {
        "lon": -83,
        "lat": 39.96
    },
    "cond": "Clouds",
    "desc": "scattered clouds",
    "icon": "03d",
    "temp": {
        "curr": 76.55,
        "low": 65.95,
        "high": 83.08
    }
}
```
