const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


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

UserSchema.pre('save', async function () {
    if (!this.password || !this.isModified('password'))
        return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.getName = function () {
    return `${this.first_name} ${this.last_name}`
}

UserSchema.methods.createJWT = function () {
    console.log('Creating JWT for user:', this);
    const fullName = this.getName()
    console.log('Full name for JWT:', fullName);
    return jwt.sign({
        userId: this._id, userName: this.username, fullName: fullName,
        email: this.email, admin: this.is_admin, createdDate: this.createdAt
    },

        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME })
}

UserSchema.methods.comparePassword = async function (basePassword) {
    const isMatch = await bcrypt.compare(basePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)