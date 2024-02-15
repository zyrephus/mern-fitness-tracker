const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Username must be at least 4 characters long']
    },
    password: {
        type: String,
        required: true
    }
})

// Static signup method
userSchema.statics.signup = async function(email, username, password) {
    // Validation
    if (!email || !username || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    
    // Finding if email or username has already been taken
    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw Error('Email already in use')
    }
    const usernameExists = await this.findOne({ username })
    if (usernameExists) {
        throw Error('Username already in use')
    }

    // Hashing passwords for security
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, username, password: hash })

    return user
}

// Static login method
userSchema.statics.login = async function(username, password) {
    // Validation
    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    // Finding if username exists
    const user = await this.findOne({ username })
    if (!user) {
        throw Error('Incorrect username')
    }

    // Checking if passwords match
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)