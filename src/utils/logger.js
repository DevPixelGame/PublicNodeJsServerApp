const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const process = require('process');
 
const { combine, timestamp, label, printf } = winston.format;


var moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const logDir = `${process.cwd()}/logs`;
 
const myFormat = printf(({ level, message, timestamp , at }) => {

    if (level == 'error') {
        console.log('*** at error : ', at, '**** message : ', message)
        // if (at == null) return;

        
        let on = ''
        let file = ''
        let line = ''
        let data = ''
        if (at && at.stack) {
            on = at.stack.split('\n')[1].slice(7).split('/').pop() ;
            file = on.split(':')[0]
            line = on.split(':')[1]
            data = Date(timestamp).toString().split(' GMT')[0]
        }


        return `${moment().toDate('YYYY-MM-DD HH:mm:ss')} ${level}: ${file} line ${line} 
        ${message}`;
    }
    
    return `${moment().toDate('YYYY-MM-DD HH:mm:ss')} ${level}: ${message}`;
  });

  
//* log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
   return `${moment().toDate('YYYY-MM-DD HH:mm:ss')} ${path} [${label}] ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});
 
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    //* 로그 출력 형식 정의
    format: combine(
        timestamp(moment().toDate('YYYY-MM-DD HH:mm:ss')),
        label({ label: '[LOG]' }), // 어플리케이션 이름
        myFormat, // log 출력 포맷
        //? format: combine() 에서 정의한 timestamp와 label 형식값이 logFormat에 들어가서 정의되게 된다. level이나 message는 콘솔에서 자동 정의
    ),
    //* 실제 로그를 어떻게 기록을 한 것인가 정의
    transports: [
        //* info 레벨 로그를 저장할 파일 설정 (info: 2 보다 높은 error: 0 와 warn: 1 로그들도 자동 포함해서 저장)
        new winstonDaily({
            level: 'info', // info 레벨에선
            datePattern: 'YYYY-MM-DD', // 파일 날짜 형식
            dirname: logDir + '/info', // 파일 경로
            filename: `%DATE%.log`, // 파일 이름
            maxFiles: 30, // 최근 30일치 로그 파일을 남김
            zippedArchive: true,
        }),
        //* error 레벨 로그를 저장할 파일 설정 (info에 자동 포함되지만 일부러 따로 빼서 설정)
        new winstonDaily({
            level: 'error', // error 레벨에선
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error', // /logs/error 하위에 저장
            filename: `%DATE%.error.log`, // 에러 로그는 2020-05-28.error.log 형식으로 저장
            maxFiles: 30,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'http', // error 레벨에선
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/http', // /logs/error 하위에 저장
            filename: `%DATE%.http.log`, // 에러 로그는 2020-05-28.error.log 형식으로 저장
            maxFiles: 30,
            zippedArchive: true,
        })
    ],
    //* uncaughtException 발생시 파일 설정
    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});
 
//* Production 환경이 아닌, 개발 환경일 경우 파일 들어가서 일일히 로그 확인하기 번거로우니까 화면에서 바로 찍게 설정 (로그 파일은 여전히 생성됨)
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // 색깔 넣어서 출력
                winston.format.simple(), // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
            ),
        }),
    );
}
 
module.exports = logger;
/*
const logger = require("./logger");
 
logger.info("hello world");
logger.error("hello world");
logger.warn("hello world");
logger.debug("hello world");
logger.verbose("hello world");
logger.silly("hello world");

*/