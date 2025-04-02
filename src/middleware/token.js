const jwt = require("jsonwebtoken")
const config = require('./config')
const randToken = require('rand-token')
const User = require('../models/userModel')
const logger = require('../utils/logger')


function createToken () {
    try {
                const aa = jwt.sign({
                        uid: 1,
                        nick: '유황숙'
                    },
                    config.SECRET_KEY,
                    config.option);

        console.log(aa)
        console.log(randToken.uid(16))
    
    } catch(err) {
        logger.error({message: err, at: new Error})
    }
}

exports.verifyToken = async (req, res, next) => {
    let authHeader = req.headers["Authorization"] || req.get("Authorization")
    let token = authHeader && authHeader.split(" ")[1];
    
    if (token) {
        // Decoding
        jwt.verify(token, config.SECRET_KEY, (err, result) => {
            if (err) {
                next({ code: 0, message: err.message })
            } else {
                req.verifiedUser = result;
                next()
            }
        })
  } else {
        next({ code: 0, message: "Token missing!" })
  }
}