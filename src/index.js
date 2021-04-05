const readline = require('readline')
const fetch = require('node-fetch')

const API_key = 'd3c15055294886db5cbaba813c393d87'

function ask(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  return new Promise((res, rej) => {
    rl.question(query, ans =>{
      rl.close()
      res(ans)
    })
  })
}

let options = {}
let urls = {}

(async () => {
  options.zip = await ask('Enter zipcode: ')
  options.country = await ask('Enter two letter country code: ')
  options.queryType = await('Current weather or hourly forecast? [c/h] ')
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
  console.log(temps.join(', '))
  console.log(feels.join(', '))
})()