var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var readline = require("readline");
var nodeFetch = require("node-fetch");
require("dotenv").config();
var API_KEY = process.env.API_KEY;
function ask(query) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(function (resolve, reject) {
    rl.question(query, function (ans) {
      rl.close();
      resolve(ans);
    });
  });
}
var options = {
  zip: "",
  country: "",
  queryType: "",
  lat: "",
  lon: "",
};
var urls = {
  current: "",
  forecast: "",
};
function main() {
  return __awaiter(this, void 0, void 0, function () {
    var _a, _b, _c, res, data, res2, data2, hours, temps, feels, i;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          _a = options;
          return [4 /*yield*/, ask("Enter zipcode: ")];
        case 1:
          _a.zip = _d.sent();
          _b = options;
          return [4 /*yield*/, ask("Enter two letter country code: ")];
        case 2:
          _b.country = _d.sent();
          _c = options;
          return [4 /*yield*/, "Current weather or hourly forecast? [c/h] "];
        case 3:
          _c.queryType = _d.sent();
          urls.current =
            "https://api.openweathermap.org/data/2.5/weather?zip=" +
            options.zip +
            "," +
            options.country +
            "&appid=" +
            API_KEY +
            "&units=imperial";
          return [4 /*yield*/, nodeFetch(urls.current)];
        case 4:
          res = _d.sent();
          return [4 /*yield*/, res.json()];
        case 5:
          data = _d.sent();
          options.lat = data.coord.lat;
          options.lon = data.coord.lon;
          urls.forecast =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            options.lat +
            "&lon=" +
            options.lon +
            "&exclude=current,daily,minutely,alerts&appid=" +
            API_KEY +
            "&units=imperial";
          return [4 /*yield*/, nodeFetch(urls.forecast)];
        case 6:
          res2 = _d.sent();
          return [4 /*yield*/, res2.json()];
        case 7:
          data2 = _d.sent();
          hours = data2.hourly;
          temps = [];
          feels = [];
          for (i = 0; i < 4; i++) {
            temps.push(hours[i].temp);
            feels.push(hours[i].feels_like);
          }
          console.log(temps.join(", "));
          console.log(feels.join(", "));
          return [2 /*return*/];
      }
    });
  });
}
main();
