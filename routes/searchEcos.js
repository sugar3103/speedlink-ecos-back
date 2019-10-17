const express = require('express');

const Router = express.Router();

const {mysqlPoolConnection} = require('../connect');

Router.get("/api/search_ecos", (req, res)=>{
    mysqlPoolConnection.getConnection(function(err, connection){
        if(err) throw err;
        connection.query("SELECT * FROM special_zone", (err, rows, fields) => {
            connection.release();
            if(err) throw err;
            else console.log("get data success")
        })
    })
})