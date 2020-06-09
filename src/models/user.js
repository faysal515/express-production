const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true, index: true },
  password: String
}, { timestamps: true })


userSchema.index({ username: 1})

const User = mongoose.model('users', userSchema)

module.exports = User
