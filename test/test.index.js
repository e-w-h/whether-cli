const expect = require('chai').expect
const request = require('request')

describe('Consuming Weather API', function() {
  describe('Getting current weather data', function() {
    const zipcode = '10021'
    const country = 'us'
    const API_key = 'd3c15055294886db5cbaba813c393d87'
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${country}&appid=${API_key}&units=imperial`
    it('returns status 200', function() {
      request(url, function(err, res, body) {
        expect(res.statusCode).to.equal(200)
      })
    })

    it('contains coordinate information in the body', function() {
      request(url, function(err, res, body) {
        const all = JSON.parse(body.toString())
        expect(all).to.have.property('coord')
        expect(all.coord).to.have.property('lat')
        expect(all.coord).to.have.property('lon')
      })
    })

    it('contains temperature information in the body', function() {
      request(url, function(err, res, body) {
        const main = JSON.parse(body.toString()).main
        expect(main).to.have.property('temp')
      })
    })
  })
})