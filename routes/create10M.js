const express = require("express");
const Router = express.Router();

const { mysqlPoolConnection } = require("../connect");

const current_datetime = new Date();
const current =
  current_datetime.getFullYear() +
  "-" +
  (current_datetime.getMonth() + 1) +
  "-" +
  current_datetime.getDate() +
  " " +
  current_datetime.getHours() +
  ":" +
  current_datetime.getMinutes() +
  ":" +
  current_datetime.getSeconds();

Router.get("/api/create10m", async (req, res) => {
  for (let i = 0; i < 400000; i++) {
    var sql = `INSERT INTO test_ecos (name, from_city, to_city, created_by, updated_by, created_date, updated_date) 
        VALUES ("Zone ${i}", "City ${i + 1}", "Destination ${i +
      2}", "Sugar ${i + 3}", "Sugar ${i + 4}", "${current}", "${current}")`;
    mysqlPoolConnection.query(sql, function(err, result) {
      if (err) throw err;
    });
  }
});

module.exports = Router;
