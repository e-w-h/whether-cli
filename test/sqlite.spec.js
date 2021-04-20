const expect = require("chai").expect;
const db = require("../bin/sqlite");

describe("Database actions", function () {
  it("initializes correctly", async function () {
    await db.init();
  });

  it("can store and retrieve items", async function () {
    const LOCATION = {
      id: 0,
      zipcode: "10021",
      country_code: "us",
    };

    await db.init();
    await db.addLoc(LOCATION);
    const locs = await db.getLocs();
    expect(locs.length).to.not.equal(0);
    expect(locs[0]).to.deep.equal(LOCATION);
  });
});
