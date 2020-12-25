const request = require ('request')
const forecast = (longitude, latitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=ab482fd37c659d8fdd271abbfa4babf2&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '&units=f'

    request({url , json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Please try different location', undefined)
        } else {
            callback(undefined, 
                'Weather conditions:' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + 
                 '. There is a ' + body.current.precip * 100 + '% chance of rain.' + " The wind_speed is " + body.current.wind_speed + ". Humidity : " + body.current.humidity
            )     
        }

    })
}

module.exports = forecast