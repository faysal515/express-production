const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi')
const logger = require('@src/logger')('SignupHandler')
const User = require('@src/models/user')
const { wrapJWTSign, SuccessResponse, ErrorResponse, processValidationError } = require('@src/utils/common')

const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
}).options({ abortEarly : false })

const SignupHandler = async (user, body) => {
  try {
    const { error, value } = schema.validate(body)
    if (error) return ErrorResponse(400, processValidationError(error), error)


    const { username, email, password } = body

    const hash = await bcrypt.hash(password, 10) // salt round 10
    
    const newUser = new User({ username, email, password: hash })
    const saved = await newUser.save()
    logger.info('New user Registered', saved._doc)

    const token = await wrapJWTSign({ _id: saved._doc._id, username }, process.env.JWT_SECRET, { expiresIn: '15d' })
    return SuccessResponse({ token })
    
  } catch (e) {
    return ErrorResponse(400, e.message)
  }
}

module.exports = SignupHandler