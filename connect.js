const mysql = require("mysql");
const dbDetail = require("./config");

var mysqlPoolConnection = mysql.createPool(dbDetail.detail);
var mysqlConnection = mysql.createConnection(dbDetail.detail);

// mysqlConnection.getConnection(err => {
//   if (!err) {
//     console.log("connected to db");
//   } else {
//   }
// });

module.exports = { mysqlPoolConnection, mysqlConnection };
