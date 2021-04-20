const readline = require("readline");
const nodeFetch = require('node-fetch')
require("dotenv").config();

const API_KEY = process.env.API_KEY;

function ask(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve, reject) => {
    rl.question(query, (ans: string) => {
      rl.close();
      resolve(ans);
    });
  });
}

interface Options {
  zip: string;
  country: string;
  queryType: string;
  lat: string;
  lon: string;
}

const options: Options = {
  zip: "",
  country: "",
  queryType: "",
  lat: "",
  lon: "",
};

interface URLS {
  current: string;
  forecast: string;
}

const urls: URLS = {
  current: "",
  forecast: "",
};

async function main() {
  options.zip = await ask("Enter zipcode: ");
  options.country = await ask("Enter two letter country code: ");
  options.queryType = await "Current weather or hourly forecast? [c/h] ";
  urls.current = `https://api.openweathermap.org/data/2.5/weather?zip=${options.zip},${options.country}&appid=${API_KEY}&units=imperial`;
  const res = await nodeFetch(urls.current);
  const data = await res.json();
  options.lat = data.coord.lat;
  options.lon = data.coord.lon;
  urls.forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${options.lat}&lon=${options.lon}&exclude=current,daily,minutely,alerts&appid=${API_KEY}&units=imperial`;
  const res2 = await nodeFetch(urls.forecast);
  const data2 = await res2.json();
  let hours = data2.hourly;
  let temps = [];
  let feels = [];
  for (let i = 0; i < 4; i++) {
    temps.push(hours[i].temp);
    feels.push(hours[i].feels_like);
  }
  console.log(temps.join(", "));
  console.log(feels.join(", "));
}

main();
