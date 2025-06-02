const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY


async function getToken(data){
    const token = await jwt.sign(data , SECRET_KEY)
    return token
}

async function getPayload(token){
    const payload = await jwt.verify(token , SECRET_KEY)
    return payload
}




module.exports = {getToken, getPayload}