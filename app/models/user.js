const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    // name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    dob: { type: Date, required: true },
    country: { type: String, required: true },
    // gender: { type: String, required: true },
    role: { type: String, default: 'customer' }
}, { timestamps: true })

// const users = mongoose.model('User' , usersSchema)

module.exports = mongoose.model('User', userSchema)