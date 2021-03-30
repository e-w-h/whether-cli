const https = require('https')
const fs = require('fs')

let options = {
  url: '',
  zipcode: '',
  country: '',
  api_key: '',
}

const zipcode = '10021'
const country = 'us'
const API_key = 'd3c15055294886db5cbaba813c393d87'
const endpoints = {
  current: `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${country}&appid=${API_key}&units=imperial`,
  forecast: `https://api.openweathermap.org/data/2.5/onecall?lat=40.7685&lon=-73.9588&exclude=current,daily,minutely,alerts&appid=${API_key}&units=imperial`,
}

console.log('Enter zipcode')
process.stdin.on('data', data => {
  options.zipcode = data
  process.exit()
})

console.log('Current weather or hourly forecast? [c/f]')
process.stdin.on('data', data => {
  if (data === 'c') {
    options.url = endpoints.current
  } else if (data === 'f') {
    options.url = endpoints.forecast
  } else {
    console.log('Invalid input')
  }
})

options.country = country
options.api_key = API_key


fs.writeFile('options.txt', JSON.stringify(options), (err) => {
  if (err) {
    console.error(err)
  }
})

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