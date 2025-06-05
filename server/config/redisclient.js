const {createClient} = require('redis')
const dotenv = require('dotenv')

dotenv.config()

const redis = createClient()

redis.on('error', (error)=>{
    console.log("Error in connecitng "+error)
})

redis.on('connect', ()=>{
    console.log("Redis connected!")
})



module.exports = redis