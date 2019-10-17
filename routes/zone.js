const express = require("express");
const ecos = express.Router();
const ecosTotal = express.Router();

const { mysqlPoolConnection } = require("../connect");

const rowEachPage = 100000;
let dataLength = 0;
let totalPage = 0;

// res.send detail of the table to client,
// such as data length, total row
ecosTotal.get("/api/test_ecos_total", async (req, res) => {
  mysqlPoolConnection.getConnection(function(err, connection) {
    if (err) throw err;
    else {
      connection.query(
        "SELECT COUNT(*) AS ecosCount FROM zone ",
        (err, rows, fields) => {
          connection.release();
          if (!err) {
            totalPage = 0;
            dataLength = 0;
            rows.map(ele => (dataLength += ele.ecosCount));
            totalPage +=
              dataLength % rowEachPage > 0
                ? Math.floor(dataLength / rowEachPage) + 1
                : dataLength / rowEachPage;
            console.log("total data", dataLength);
            console.log("total Page", totalPage);
            res.send({ rows, totalPage, dataLength, rowEachPage });
          } else console.log("Get data length error", err);
        }
      );
    }
  });
});

// send total Page to app.js to it for make app.use total page to route to
const totalCount = loadsuccess => {
  mysqlPoolConnection.getConnection(function(err, connection) {
    if (err) throw err;
    else {
      connection.query(
        "SELECT COUNT(*) AS ecosCount FROM zone",
        (err, rows, fields) => {
          connection.release();
          if (!err) {
            totalPage = 0;
            dataLength = 0;
            totalPage +=
              rows[0].ecosCount % rowEachPage > 0
                ? Math.floor(rows[0].ecosCount / rowEachPage) + 1
                : rows[0].ecosCount / rowEachPage;
            loadsuccess(totalPage);
          }
        }
      );
    }
  });
};

// create API for amount of page depend on how many rowEachPage on first time
mysqlPoolConnection.getConnection(function(err, connection) {
  if (err) throw err;
  else {
    connection.query(
      "SELECT COUNT(*) AS ecosCount FROM zone ",
      (err, rows, fields) => {
        connection.release();
        if (!err) {
          totalPage = 0;
          dataLength = 0;
          rows.map(ele => (dataLength += ele.ecosCount));
          totalPage +=
            dataLength % rowEachPage > 0
              ? Math.floor(dataLength / rowEachPage) + 1
              : dataLength / rowEachPage;
          for (let i = 0; i < totalPage; i++) {
            ecos.get(`/api/test_ecos_${i}`, async (req, res) => {
              mysqlPoolConnection.getConnection(function(err, connection) {
                if (err) throw err;
                else {
                  connection.query(
                    `SELECT * FROM zone LIMIT ${rowEachPage} offset ${rowEachPage *
                      i}`,
                    (err, rows, fields) => {
                      if (!err) {
                        res.send(rows);
                      } else console.log("get data from zone error", err);
                    }
                  );
                }
              });
            });
          }
        } else console.log("Get data length error", err);
      }
    );
  }
});

module.exports = { ecos, ecosTotal, totalCount };
