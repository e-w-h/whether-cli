const readline = require('readline')
const fetch = require('node-fetch')

const API_key = 'd3c15055294886db5cbaba813c393d87'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let options = {}
let urls = {}

const getZip = () => {
  return new Promise((resolve, reject) => {
    rl.question('Enter zipcode: ', (answer) => {
      options.zip = answer.trim()
      resolve()
    })
  })
}

const getCountry = () => {
  return new Promise((resolve, reject) => {
    rl.question('Enter two letter country code: ', (answer) => {
      options.country = answer.trim()
      resolve()
    })
  })
}

const getQueryType = () => {
  return new Promise((resolve, reject) => {
    rl.question('Current weather or hourly forcast? [c/h] ', (answer) => {
      options.queryType = answer.trim()
      resolve()
    })
  })
}

(async () => {
  await getZip()
  await getCountry()
  await getQueryType()
  rl.close()
  urls.current = `https://api.openweathermap.org/data/2.5/weather?zip=${options.zip},${options.country}&appid=${API_key}&units=imperial`
  const res = await fetch(urls.current)
  const data = await res.json()
  options.lat = data.coord.lat
  options.lon = data.coord.lon
  urls.forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${options.lat}&lon=${options.lon}&exclude=current,daily,minutely,alerts&appid=${API_key}&units=imperial`
  const res2 = await fetch(urls.forecast)
  const data2 = await res2.json()
  let hours = data2.hourly
  let temps = []
  let feels = []
  for (let i = 0; i < 4; i++) {
    temps.push(hours[i].temp)
    feels.push(hours[i].feels_like)
  }
  console.log(temps)
  console.log(feels)
})()