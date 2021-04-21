const sqlite3 = require('sqlite3')
const path = require('path')

let db;

function init() {
  return new Promise((res, rej) => {
    db = new sqlite3.Database(path.resolve(__dirname, "sqlite.db"), (err) => {
      if (err) {
        return rej(err);
      }
      db.run(
        `CREATE TABLE IF NOT EXISTS location_info (
          id integer NOT NULL, 
          zipcode text NOT NULL, 
          country_code text NOT NULL
        )`,
        (err, result) => {
          if (err) {
            return rej(err);
          }
          res();
        }
      );
    });
  });
}

async function close() {
  return new Promise((res, rej) => {
    db.close((err) => {
      if (err) {
        rej(err);
      } else {
        res("Closed the database connection");
      }
    });
  });
}

async function getLocs() {
  return new Promise((res, rej) => {
    db.all(`SELECT * FROM location_info`, (err, rows) => {
      if (err) {
        return rej(err);
      }
      res(rows);
    });
  });
}

async function addLoc(loc) {
  return new Promise((res, rej) => {
    db.run(
      `INSERT INTO location_info (id, zipcode, country_code) VALUES (?, ?, ?)`,
      [loc.id, loc.zipcode, loc.country_code],
      (err) => {
        if (err) {
          return rej(err);
        }
        return res();
      }
    );
  });
}

module.exports = {
  init,
  teardown,
  getLocs,
  addLoc,
};
