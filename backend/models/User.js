const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 20,
        trim: true,
        match: [
            /^[A-Za-z0-9_-]+$/,
            'Username can only contain letters, numbers, underscores, or dashes',
        ],
        sparse: true,
    },
    first_name: {
        type: String,
        required: [true, 'Please Provide Your First Name'],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, 'Please Provide Your Last Name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please Provide An Email'],
        lowercase: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Please Provide A Password'],
        trim: true,
    },
    resetToken: {
        type: String,
    },
    resetTokenExpiration: {
        type: Date,
    },
    is_admin: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true }

)

module.exports = mongoose.model('User', UserSchema)