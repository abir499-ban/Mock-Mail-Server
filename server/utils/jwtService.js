const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY


async function getToken(data){
    const token = await jwt.sign(data , SECRET_KEY)
    return token
}




module.exports = {getToken}