const express = require('express')
const router = express.Router()
const logger = require('../utils/logger')
var moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

function GetCurrentTime(req, res) {
    console.log('******* GetCurrentTime')
    res.send(moment().format("YYYY-MM-DD HH:mm:ss"))
}


module.exports = app => {
    // 전체 조회 

    app.get("/api/getCurrentServerTime", GetCurrentTime);
};