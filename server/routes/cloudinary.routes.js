const {Router} = require('express')
const CloudinaryController = require('../controller/cloudinary.controller')

const router = Router()

router.post('/get_signedUrl' , CloudinaryController.get_signedURL)

module.exports = router