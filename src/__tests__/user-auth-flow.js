const signUp = async () => {
  const r = await SignupHandler(undefined, { username: 'faysal', email: 'faysal@yahoo.com', password: 'qweqwe'})
  expect(r.code).toBe(200)
  expect(r.payload.result).toHaveProperty('token')
}

const login = async () => {
  const r = await LoginHandler(undefined, { username: 'admin', password: 'qweqwe'})
  expect(r.code).toBe(200)
  expect(r.payload.result).toHaveProperty('token')
}

module.exports = {
  signUp,
  login
}