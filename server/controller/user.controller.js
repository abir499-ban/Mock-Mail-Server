const User = require("../models/User.schema")
const dbService = require("../utils/dbService")
const ResponseEmitter = require("../utils/ResponseEmitter")



const userController = {
    getUser: async(req , res)=>{
        const email = req.params.email
        if(!email) return new ResponseEmitter(res).badRequest("No email provided")
        try {
            const fetched_user = await new dbService().findOne(User , {email : email})
            if(!fetched_user) return new ResponseEmitter(res).badRequest('No such user exists with this email')
            
                const user = fetched_user.toObject()
                return new ResponseEmitter(res).successfull("user fetched succesfully" , {...user , password : undefined})
            
            
        } catch (error) {
            console.log(error)
            return new ResponseEmitter(res).internalServerError()
        }
    }
}

module.exports = userController