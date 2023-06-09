const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        lowercase: true,
        required: true
    },
    lastName : {
        type: String,
        lowercase: true,
        required: true
    },
    email : {
        type: String,
        lowercase: true,
        required: true,

    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User