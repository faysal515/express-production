const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const logger = require('@src/logger')('LoginHandler')
const User = require('@src/models/user')
const { wrapJWTSign, SuccessResponse, ErrorResponse } = require('@src/utils/common')
const ErrorCodes = require('@src/utils/errorCodes')


const LoginHandler = async (auth, body) => {
  const { username, password } = body
  const user = await User.findOne({ username }).exec()
  
  if(!user) return ErrorResponse(400, ErrorCodes.RUNTIME_ERROR, 'User Not found')

  const match = await bcrypt.compare(password, user._doc.password)
  if(!match) return ErrorResponse(401, ErrorCodes.RUNTIME_ERROR, 'Incorrect password')

  const token = await wrapJWTSign({ _id: user._doc._id, username }, process.env.JWT_SECRET, { expiresIn: '15d' })
  return SuccessResponse({ token })
  
}



module.exports = LoginHandler