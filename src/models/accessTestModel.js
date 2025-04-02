var moment = require('moment');
const { json } = require("body-parser");
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 
const logger = require('../utils/logger')

const { getConnection, releaseConnection } = require('./db');
// 생성자 
const AccessTest = function(user){
    this.gold = user.gold;
};

// customer id로 조회
AccessTest.findByID = async (index, result) => {
    let connection;
    connection = await getConnection();
    try {
        await connection.beginTransaction();
        const [contentsResult] = await connection.query('SELECT * FROM testDB WHERE tid = ?', index)
        await connection.commit();
        if (contentsResult.length) {
            return result(null, contentsResult[0]);
        } else {
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

module.exports = AccessTest;
