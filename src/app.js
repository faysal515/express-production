require('@src/mongo')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('@src/logger')('HttpLogger')
const { SignupRoute, LoginRoute } = require('@src/routes/user')
const { ErrorResponse } = require('@src/utils/common')
const ErrorCodes = require('@src/utils/errorCodes')
const app = express()

app.use(bodyParser.json())
app.use((req, res, next) => {
  logger.info('Input', req.body)
  next()
})

app.post('/signup', SignupRoute)
app.post('/login', LoginRoute)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json(ErrorResponse(500, ErrorCodes.UNKNOWN_ERROR, 'Something broke!', err.message))
})

module.exports = app