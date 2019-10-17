const express = require("express");
const Router = express.Router();

const { mysqlPoolConnection } = require("../connect");

Router.get("/api/ecos_system", (req, res) => {
  mysqlPoolConnection.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query("SELECT * FROM special_zone", (err, rows, fields) => {
      connection.release();
      if (!err) {
        res.send(rows);
      } else {
        console.log("get Data error", err);
      }
    });
  });
});

module.exports = Router;
