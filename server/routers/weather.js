const router = require('express').Router()
const weather = require('../controllers/weather_controller')

router.get('/show-weather', weather.getWeather)

module.exports = router