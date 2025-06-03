const {Router} = require('express')
const authController = require('../controller/auth.controller')
const router = Router()

router.post('/signup' , authController.signUp)
router.post('/signin', authController.signin)

module.exports = router