const tokenMiddleWare = require('../middleware/token')

module.exports = app =>{
    const users = require('../controller/userController');

    // 게임 중, DB접근이 필요할 때,
    app.get("/api/get/user", users.findOne);


    app.post("/api/login/uid", users.createToken);

    app.get("/api/get/player/data/uid/:uid", users.findAllDataByUser);
};