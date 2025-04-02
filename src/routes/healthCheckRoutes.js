const express = require('express')
const router = express.Router()
const logger = require('../utils/logger')
var moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

function HealthCheckFunction(req, res) {
    console.log('* health check')
    res.sendStatus(200)
}

module.exports = app => {
    app.get("/api/health", HealthCheckFunction);
};