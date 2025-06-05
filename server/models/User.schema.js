const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (val) => { return val && val.length > 6 },
        }
    },
    sentMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages',
        required: false
    }],
    receivedMessage: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages',
        required: false
    }]
}, {
    timestamps: true
});



const User = model('User', UserSchema)
module.exports = User