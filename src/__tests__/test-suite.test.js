const mongoose = require('mongoose')
jest.setTimeout(20 * 60 * 1000)
const SignupHandler = require('../controllers/signup')
const LoginHandler = require('../controllers/login')

const userFlow = require('./user-auth-flow')

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  console.log('Mongoose Connected to DB')
  
})

describe('All tests', () => {
  test('01. insert user', async () => await userFlow.signUp)
  test('02. login', async () => await userFlow.login)
})
