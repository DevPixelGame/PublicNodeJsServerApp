const { getConnection, releaseConnection } = require('./db.js');

const logger = require('../utils/logger')
var moment = require('moment');
const { json } = require("body-parser");
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

const tokenMiddleWare = require('../middleware/token');


// const tokenMiddleWare = require('../middleware/token');
const User = function(user){
    this.nick_name = user.nick_name;
    this.gold = user.gold;
};

User.findOne = async ()=>{
    let connection;
    connection = await getConnection();

    try {
        await connection.beginTransaction();
        const [userResult] = await connection.query('SELECT * FROM users');

        console.log(userResult)
        
        await connection.commit();
        return result(null, 'ok'); // 중복된 유저가 없음
    } catch (err) {
        logger.error({message: err, at: new Error})
        await connection.rollback();
        return result(err, null);
    } finally {
        if (connection) {
            releaseConnection(connection)
        }
    }
};


User.createToken = async (req, res) => {
    try {
        tokenMiddleWare.createToken((data, err) => {
            if (err) {
                return res(err, null);
            }

            console.log('access: ' , data.accessToken)
            console.log('ref: ', data.refreshToken)

        })
    } catch (err) {
        logger.error({message: err, at: new Error})
        return;
    }
}


User.findByGpgsId = async (gpgsId, result) => {
    let connection;
    connection = await getConnection();
    try {
        await connection.beginTransaction();
        const [userResult] = await connection.query('SELECT * FROM users WHERE gpgsId = ?', gpgsId);
        if (userResult.length) {
            await connection.commit();
            return result(null, userResult[0]);
        } else {
            // logger.err('*** 유저가 존재하지 않습니다.')
            await connection.rollback();
            return result(null, null);
        }
    } catch (err) {
        logger.error({message: err, at: new Error})
        await connection.rollback();
        return result(err, null);
    } finally {
        if (connection) {
            releaseConnection(connection)
        }
    }
};

User.findAllById = async (uid, result) => {
    let connection;
    connection = await getConnection();
    try {
        await connection.beginTransaction();
        var total_json = {
            playerData: [],
        }

        const [playerDataResult] = await connection.query('SELECT * FROM users WHERE uid = ?', uid);
        if (playerDataResult.length) {
            playerDataResult.forEach(element => {
                total_json.playerData =
                    {
                        uid: element.uid,
                        nick_name: element.nick_name,
                        isAdmin: element.isAdmin,
                        platform: element.platform,
                        version: element.version,
                        gpgsId: element.gpgsId,
                        token: element.token,
                        refreshToken: element.refreshToken,
                        uuid: element.uuid,
                        level: element.level,
                        heroSlots: element.heroSlots,
                        stoneItems: element.stoneItems
                    }
            });

            await connection.commit();
            return result(null, total_json);
        } else {
            // logger.err('*** 유저가 존재하지 않습니다.')
            await connection.commit();
            return result(null, null);
        }
    } catch (err) {
        logger.error({message: err, at: new Error})
        await connection.rollback();
        return result(err, null);
    } finally {
        if (connection) {
            releaseConnection(connection)
        }
    }
};



module.exports = User;
 