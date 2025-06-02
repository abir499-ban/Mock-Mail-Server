const dbService = require('../utils/dbService')
const User = require('../models/User.schema')
const ResponseEmitter = require('../utils/ResponseEmitter')
const bcryptjs = require('bcryptjs')
const { getToken } = require('../utils/jwtService')



const authController = {
    signUp: async (req, res) => {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return new ResponseEmitter(res).badRequest("Incomplete Request feilds")
        }
        try {
            const doesUserExist = await new dbService().findOne(User, { email: email })

            if (doesUserExist) {
                return new ResponseEmitter(res).badRequest("User already Exists")
            }

            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt)
            await new dbService().create(User, { username, email, password: hashedPassword })
        }
        catch (err) {
            console.log(err)
            return new ResponseEmitter(res).internalServerError("server error")
        }

        return new ResponseEmitter(res).successfull("user created successfully")
    },

    signin: async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) return new ResponseEmitter(res).badRequest("Incomplete Sign In Payload")
        try {
            const user = await new dbService().findOne(User, {email : email})
            if (!user) return new ResponseEmitter(res).customeResponse(400, "User does not exist with such email")

            
            const matchPassword = await bcryptjs.compare(password , user.password)
            if (!matchPassword) return new ResponseEmitter(res).customeResponse(400, "Wrong Password")
            const token = await getToken({id : user._id , username : user.username , email : user.email})

            return new ResponseEmitter(res).successfull("Successfull Login" , {email : email , accessToken : token})

        } catch (error) {
            console.log(err)
            return new ResponseEmitter(res).internalServerError()
        }
    }

}

module.exports = authController