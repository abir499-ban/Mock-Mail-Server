const {Router} = require('express')
const userController = require('../controller/user.controller')

const router = Router()

router.get('/:email' , userController.getUser)
router.post('/sendMail' , userController.sendEmail)

module.exports = router