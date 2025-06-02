const {v2} = require('cloudinary')
const dotenv = require('dotenv')

dotenv.config()

v2.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.CLOUD_SECERT
})

module.exports = v2