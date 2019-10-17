const express = require("express");
const stringify = require("csv-stringify");

const Router = express.Router();
const stringifier = stringify();

const { mysqlPoolConnection } = require("../connect");

var countQuery = "SELECT count(*) as total FROM test_ecos";
var chunkSize = 100000;

Router.get("/api/test_streaming", async (req, res) => {
  mysqlPoolConnection.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      console.log("connection error", err);
      throw err;
    } else {
      // var query = connection.query("SELECT * FROM test_ecos");
      // query
      //   .on("error", function(err) {
      //     console.log("query bigdata error", err);
      //   })
      //   .on("fields", function(fields) {
      //     console.log("the fields", fields);
      //   })
      //   .on("result", function(row) {
      //     res.send(row);
      //   })
      //   .on("end", function() {
      //     connection.release();
      //   });

      connection
        .query("SELECT * FROM test_ecos")
        .stream({ highWaterMark: 10 })
        .pipe(stringifier)
        .pipe(process.stdout);

      // connection
      //   .query("SELECT * FROM test_ecos")
      //   .on("error", function(err) {
      //     console.log("query data error", err);
      //   })
      //   .stream()
      //   .pipe(
      //     new stream.Transform({
      //       objectMode: true,
      //       transform: function(row, recording, callback) {
      //         res.send(row);
      //         callback();
      //       }
      //     })
      //   );
    }
  });
});

module.exports = Router;
