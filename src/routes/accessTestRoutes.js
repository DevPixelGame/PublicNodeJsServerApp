const express = require('express')
const router = express.Router()
const logger = require('../utils/logger')
var moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

function GetValue(req, res) {
    // 1: 접속
    // 4: 접속 차단

    if (req) {
        const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`User IP: ${userIP}`);
    }

    logger.http(`** access log time: ${moment().format("YYYY-MM-DD HH:mm:ss")}`)
    // console.log('***** return 1');
    // console.log('***** 시간 : ', moment().format("YYYY-MM-DD HH:mm:ss"))
    res.send('4')
}

const accessTestController = require('../controller/accessTestController');
module.exports = app => {
    // 전체 조회 
    app.get("/api/accessValue", GetValue);
    app.get("/api/get/testDB/:index", accessTestController.getTest);
};