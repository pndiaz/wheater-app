const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGFibG9jb2R6IiwiYSI6ImNsYWN6d3IzaTAwdWU0MXBpMmdpNzg3cDYifQ.Ndcg6Ssmn2EPdNrekGfrnw&limit=1'
    console.log(url)
    request({ url, json: true }, (error, { body } = {}) => {
        console.log(error)
        if (error) {
            callback('Unable to connect to location service')
        } else if (body.message) {
            console.log(body.message)
            callback('Unable to find location')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode