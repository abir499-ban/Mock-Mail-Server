const {Router} = require('express')
const userController = require('../controller/user.controller')

const router = Router()

router.get('/:email' , userController.getUser)
router.post('/sendMail' , userController.sendEmail)
router.put('/favorite/:message_id' , userController.markFavorite)
router.put('/read/:message_id' , userController.readMail)

module.exports = router