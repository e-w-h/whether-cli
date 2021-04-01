const expect = require('chai').expect
const fetch = require('node-fetch')

describe('Consuming Weather API', function() {
  describe('Getting current weather data', function() {
    const zipcode = '10021'
    const country = 'us'
    const API_key = 'd3c15055294886db5cbaba813c393d87'
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${country}&appid=${API_key}&units=imperial`
    it('returns status 200', async function() {
      const res = await fetch(url)
      expect(res.status).to.equal(200)
    })

    it('contains coordinate information in the body', async function() {
      const res = await fetch(url)
      const data = await res.json()
      expect(data).to.have.property('coord')
      expect(data.coord).to.have.property('lat')
      expect(data.coord).to.have.property('lon')
    })

    it('contains temperature information in the body', async function() {
      const res = await fetch(url)
      const data = await res.json()
      expect(data).to.have.property('main')
      expect(data.main).to.have.property('temp')
    })
  })
})