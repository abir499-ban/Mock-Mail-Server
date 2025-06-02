const cloudinary = require('../config/cloudinary')
const ResponseEmitter = require('../utils/ResponseEmitter')
const dotenv = require('dotenv')
dotenv.config()

const CloudinaryController = {
    get_signedURL: (req, res) => {
        const { email, filename } = req.body
        if (!email || !filename) return new ResponseEmitter(res).badRequest()
        
        try{
        const timestamp = Math.round(new Date(Date.now()).getTime() / 10000)
        const folder = `uploads/${email}`
        const public_id = filename.split('.')[0]

        const paramsToSign = {
            timestamp,
            folder,
            public_id
        }

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUD_SECERT
        )

        return new ResponseEmitter(res).successfull("Signed Url" , {
            timestamp,
            signature,
            public_id,
            folder,
            apiKey: process.env.API_KEY,
            cloudName: process.env.CLOUD_NAME,
        })
    }catch(err){
        console.log(err)
        return new ResponseEmitter(res).internalServerError()
    }

    }
}

module.exports = CloudinaryController