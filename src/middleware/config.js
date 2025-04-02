const config = {
    SECRET_KEY: '807aa6e7119795dc078c4ea811717c54a10fd8e087743a6d4601ff6c20662cc11d0bccdd23e391f9dedb648c4d93d170b7fe72c34876252933ca1be5ae278a43',
    option : {
        algorithm : "HS256", // 해싱 알고리즘  // 토큰 유효 기간
        issuer: "nam_bros"
    }
}

module.exports = config