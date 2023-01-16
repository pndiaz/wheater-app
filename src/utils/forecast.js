const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b6cd6d081df0cb3ac53b0c72582ef34a&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)
    console.log(url)
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to wheater service')
        } else if (body.error) {
            console.log(body.error)
            callback('Unable to find forecast')
        } else {
            console.log(body.current)
            callback(undefined, {
                current: "It's " + body.current.weather_descriptions[0] + ". The Temperature is " + body.current.temperature + "F degrees and the humidity is " + body.current.humidity + "%",
            })
        }
    })
}

module.exports = forecast