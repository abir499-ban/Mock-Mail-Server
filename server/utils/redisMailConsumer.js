const path = require('path')
require('dotenv').config({path : path.resolve(__dirname , '../.env')})

const redis = require('../config/redisclient')
const Message = require('../models/Messages.schema')
const User = require('../models/User.schema')
const dbService = require('./dbService')

const MONGO_DB_URI = process.env.MONGO_DB_URI

async function main(){
    try {
        const dbConn = await new dbService().dbConnect(MONGO_DB_URI)
        await redis.connect()
        while(true){
            const response = await redis.brPop('Mails' , 0)
            if(response && response.element){
                const message_id = response.element
                console.log("==================message received================================= "+message_id)


                try {
                    const message = await new dbService().findByIdAndUpdate(Message , message_id , {$set : {status : 'sent'}})
                    const sender_updated = await new dbService().findOneAndUpdate(User , {email : message.sender.email} , {$push : {sentMessages : message._id}})
                    const receiver_updated = await new dbService().findOneAndUpdate(User , {email : message.dest.email} , {$push : {
                        receivedMessage : message._id
                    }})

                    if(sender_updated && receiver_updated) console.log("===================message sent===========================")
                } catch (error) {
                    const message = await new dbService().findByIdAndUpdate(Message , message_id , {$set : {status : 'failed'}})
                    console.log(error)
                }
            }
            else{
                console.log('No appr element')
            }
        }
    } catch (error) {
        console.log(error)
    }
}

main()