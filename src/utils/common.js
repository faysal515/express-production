const jwt = require('jsonwebtoken')

const wrapJWTSign = async (payload, secret, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, function(err, token) {
      if(err) reject(err)
      else resolve(token)
    })
  })
}

const SuccessResponse = data => ({code: 200, payload: { result: data } })
const isSuccessResponse = data => data && data.payload && data.payload.result

const ErrorResponse = (code, type, err, ...rest) => ({
  code,
  error: { type, error: err, rest }
})

const isErrorResponse = data => data && data.error

const returnJSON = (req, res, data) => {
  return isSuccessResponse(data) ? res.status(data.code).json(data.payload) : res.status(data.code).json(data.error)
}

const processValidationError = er => {
  return er.details.map(i => i.message)
}


module.exports = {
  wrapJWTSign,
  SuccessResponse,
  isSuccessResponse,
  ErrorResponse,
  isErrorResponse,
  processValidationError,
  returnJSON
}