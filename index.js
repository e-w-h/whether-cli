const https = require('https')
// const process = require('process')

const zipcode = '10021'
const country = 'us'
const API_key = 'd3c15055294886db5cbaba813c393d87'
const endpoints = {
  current: `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${country}&appid=${API_key}&units=imperial`,
  forecast: `https://api.openweathermap.org/data/2.5/onecall?lat=40.7685&lon=-73.9588&exclude=current,daily,minutely,alerts&appid=${API_key}&units=imperial`,
}
// TODO: Gather more information regarding future weather conditions by consuming additional API endpoints
// Chain promises

const req = https.get(endpoints.current, res => {
  if (res.statusCode !== 200) {
    console.log(`Something went wrong. Status code: ${res.statusCode}`)
  }

  res.on('data', data => {
    let condition = JSON.parse(data.toString())['weather'][0]['main'].toLowerCase()
    if (condition === 'rain') {
      console.log('Bring an umbrella')
    }
    // console.log(JSON.parse(data.toString()))
    let actualTemp = JSON.parse(data.toString())['main']['temp']
    let feelsLike = JSON.parse(data.toString())['main']['feels_like']
    console.log(`Actual: ${actualTemp}, Feels like: ${feelsLike}`)
  })
})

const fc = https.get(endpoints.forecast, res => {
  if (res.statusCode !== 200) {
    console.log(`Something went wrong. Status code: ${res.statusCode}`)
  }

  res.once('data', data => {
    let hours = JSON.parse(data.toString())['hourly']
    console.log('Weather for the next four hours:')
    let temps = []
    let feels = []
    for (let i = 0; i < 4; i++) {
      temps.push(hours[i]['temp'])
      feels.push(hours[i]['feels_like'])
    }
    console.log(temps)
    console.log(feels)
  })
})