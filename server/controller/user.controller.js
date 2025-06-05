const Message = require("../models/Messages.schema")
const User = require("../models/User.schema")
const dbService = require("../utils/dbService")
const ResponseEmitter = require("../utils/ResponseEmitter")
const redis = require('../config/redisclient')



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
    },
    sendEmail : async(req , res)=>{
        console.log(req.body)
        try {
            const{dest_mail , subject , short_desc , body , sender_email , sender_username , fileUrl} = req.body

            const message = await new dbService().create(Message , {
                sender:{
                    username : sender_username,
                    email : sender_email
                },
                dest:{email :dest_mail},
                subject : subject,
                short_description : short_desc,
                body:body,
                attachments : fileUrl
            })

            redis.lPush('Mails' , message._id.toString())
            return new ResponseEmitter(res).successfull("Email queued.....to be sent")

        } catch (error) {
            console.log(error)
        }
        return new ResponseEmitter(res).successfull()
    }
}

module.exports = userController