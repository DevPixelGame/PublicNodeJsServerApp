const jwt = require("jsonwebtoken")
const randToken = require('rand-token')

require('dotenv').config()


// console.log(process.env.SECRET_KEY)
function CreateToken() {
    jwt.sign({
        uid: 1,
        email: 'devpixelgame@gmail.com'
    },
    process.env.SECRET_KEY,
    {
        algorithm : process.env.ALGORITHM,
        issuer: process.env.ISS
    },
    (err, token) => {
        if (err) {
            console.log('**** err: ', err)
        } else {
            console.log('**** success token:', token)
        }
    });
}

CreateToken();