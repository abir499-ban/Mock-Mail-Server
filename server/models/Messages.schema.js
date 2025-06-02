const { model, Schema } = require('mongoose')

const MessageSchema = new Schema({
    from: {
        username: { type: String, required: true },
        email: { type: String, required: true }
    },
    to: { email: { type: String, required: true } },

    subject: {
        type: String,
        required: true,
    },

    short_description: { type: String, required: false },
    body: {
        type: String,
        required: true
    },
    attachments: [{type:String}],
    isfavourite: {
        type: Boolean,
        default: false
    },
    isRead: {
        type: Boolean,
        default: false
    }
})

const Message = model('Messages' , MessageSchema)

module.exports = Message