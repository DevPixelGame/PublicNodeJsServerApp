const jwt = require("jsonwebtoken")

const crypto = require('crypto');

// 64바이트(512비트)의 랜덤 데이터를 생성하고, 이를 16진수 문자열로 변환
const secretKeyOrigin = crypto.randomBytes(64).toString('hex');

console.log('생성된 secretKey:', secretKeyOrigin);

const payload = {
    uid: 1,
    nick: 'exampleUser'
  };
  
  // 비밀키 (안전하게 보관하세요)
  const secretKey = 'your-256-bit-secret';

  
  // 토큰 생성
  const token = jwt.sign(payload, secretKey);
  console.log('생성된 JWT:', token);


  