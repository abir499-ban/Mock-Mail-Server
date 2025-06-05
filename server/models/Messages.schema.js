const { model, Schema } = require('mongoose')

const MessageSchema = new Schema({
    sender: {
        username: { type: String, required: true },
        email: { type: String, required: true }
    },
    dest: { email: { type: String, required: true } },
    status: {
        type: String,
        enum: ['pending', 'sent', 'failed'],
        default: 'pending'
    },

    subject: {
        type: String,
        required: true,
    },

    short_description: { type: String, required: false },

    body: {
        type: String,
        required: true
    },
    attachments: { type: String, required: false },
    isfavourite: {
        type: Boolean,
        default: false
    },
    isRead: {
        type: Boolean,
        default: false
    }
})

const Message = model('Messages', MessageSchema)

module.exports = Message