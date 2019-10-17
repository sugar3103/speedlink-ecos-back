const express = require("express");

const Router = express.Router();

const { mysqlPoolConnection } = require("../connect");


Router.get("/api/test_offset", async (req, res) => {
  mysqlPoolConnection.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      console.log("connection error", err);
      throw err;
    } else {
      
    }
  });
});

module.exports = Router;
