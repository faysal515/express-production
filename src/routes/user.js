const SignupHandler = require('@src/controllers/signup')
const LoginHandler = require('@controllers/login')
const { returnJSON } = require('@src/utils/common')

const SignupRoute = async (req, res) => {
  const data = await SignupHandler(undefined, req.body)
  return returnJSON(req, res, data)
}

const LoginRoute = async (req, res) => {
  const data = await LoginHandler(undefined, req.body)
  return returnJSON(req, res, data)
}


module.exports = {
  SignupRoute,
  LoginRoute
}