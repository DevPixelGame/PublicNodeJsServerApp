const mysql = require('mysql2/promise');
const dbConfig = require("../config/dbConfig.js");
const logger = require('../utils/logger')

const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER, // root
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    multipleStatements: true,
    dateStrings: true,
    connectionLimit: 10, // 60이었다가 내림 (2024.03.17)
    waitForConnections: true,
    queueLimit: 0,
    keepAliveInitialDelay: 10000, // 0 by default.
    enableKeepAlive: true, // false by default.
    connectTimeout: 10000
});

const getConnection = async () => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        return connection;
    } catch (error) {
        logger.error({message: `connection error : ${error.message}`, at: new Error})

        return null;
    }
};

const releaseConnection = async (conn) => {
    try {
        await conn.release();
    } catch (error) {
        logger.error({message: `release error : ${error.message}`, at: new Error})
    }
};

const connection_test = async()=>{
    try{
        const conn = await getConnection();
        await conn.beginTransaction();
        await conn.commit();
        return true;
    }catch(err){
        console.log('connection test error: ',err);
        return false;
    }
}

module.exports = {
    connection_test,
    getConnection,
    releaseConnection,
};