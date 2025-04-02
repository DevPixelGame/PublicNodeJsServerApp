function GetCurrentTime(req, res) {
    console.log('******* GetCurrentTime')
}

module.exports = app => {
    console.log('**** log model3')
    const logs = require('../controller/logController');
    app.post("/api/logs/create", logs.create);
    app.get("/api/logs/get", logs.logGet);
    app.get("/api/logs/getTest", GetCurrentTime);
};