const https = require('https')
// const process = require('process')

const zipcode = '10021'
const country = 'us'
const API_key = 'd3c15055294886db5cbaba813c393d87'
const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${country}&appid=${API_key}&units=imperial`

const req = https.get(url, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', data => {
    console.log(JSON.parse(data.toString())['main']['temp'])
  })
})