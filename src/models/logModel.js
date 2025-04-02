const { getConnection, releaseConnection } = require('./db');
const logger = require('../utils/logger')
var moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

const Log = function(user){
    this.nick_name = user.nick_name;
    this.gold = user.gold;
};

// customer 튜플 추가 
Log.create = async body => {
    let connection;
    connection = await getConnection();
    console.log('**** log model')
    try {
        console.log('**** log model2')
        await connection.beginTransaction();
        var newLogs = {
            userId: body.userId,
            type: body.type,
            message: body.message,
            created_at: moment().toDate("YYYY-MM-DD HH:mm:ss")
        }
        
        if (newLogs.message == '메모리 변조 감지') {
            if (newLogs.userId) {
                console.log('***** 메모리 변조 감지 uid: ', newLogs.userId)
                logger.info(`**** 메모리 변조 감지 : uid ${newLogs.userId}`)
                await connection.query('UPDATE users SET isBlockedUser = 1 WHERE uid = ?', newLogs.userId)
            }
            // await connection.query('UPDATE users SET ranking = ? WHERE uid = ?', [parseInt(index + 1), data[0]])
        }

        
        await connection.query('INSERT INTO logs SET ?', newLogs, async (err, res) => {
            if (err) {
                await connection.rollback();
                logger.error({message: err, at: new Error})
                return;
            }
        })

        await connection.commit();
    } catch (err) {
        logger.error({message: err, at: new Error})
        await connection.rollback();
    } finally {
        if (connection) {
            releaseConnection(connection)
        }
    }
};

module.exports = Log;
 