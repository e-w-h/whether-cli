const https = require('https')
// const process = require('process')

const zipcode = '10021'
const country = 'us'
const API_key = 'd3c15055294886db5cbaba813c393d87'
const endpoints = {
  current: `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${country}&appid=${API_key}&units=imperial`,
  forecast: `https://api.openweathermap.org/data/2.5/onecall?lat=40.7685&lon=-73.9588&exclude=current,daily,minutely,alerts&appid=${API_key}`,
}
// TODO: Gather more information regarding future weather conditions by consuming additional API endpoints
// Chain promises

const req = https.get(endpoints.current, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', data => {
    let condition = JSON.parse(data.toString())['weather'][0]['main'].toLowerCase()
    if (condition === 'rain') {
      console.log('Bring an umbrella')
    }
    console.log(JSON.parse(data.toString()))
    console.log(JSON.parse(data.toString())['main']['temp'])
  })
})

const fc = https.get(endpoints.forecast, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.once('data', data => {
    console.log(JSON.parse(data.toString())['hourly'][0])
  })
})