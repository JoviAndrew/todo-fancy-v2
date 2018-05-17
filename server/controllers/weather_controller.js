const weather = require('weather-js');

module.exports = {
  getWeather (req, res) {
    weather.find({search: 'Jakarta', degreeType: 'C'}, function(err, result) {
      if (err) {
        console.log(err) 
      }
      
      res.status(200).json({
        message: 'Success get weather data!',
        data: result
      })
    });
  }
}