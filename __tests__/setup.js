const MongodbMemoryServer = require('mongodb-memory-server')
const { MongoClient } = require('mongodb')
const { config } = require('dotenv');
const users = require('./data/users')


const mongod = new MongodbMemoryServer.default({
  binary: {
    version: '3.6.8'
  },
  autoStart: false,
})


module.exports = async () => {
  if (!mongod.isRunning) {
    console.log("\nStarting in-memory MongoDb...")
    await mongod.start()
  }

  const connectionUri = await mongod.getConnectionString()
  console.log(`In-memory MongoDb is running at ${connectionUri}\n`)
  const connection = await MongoClient.connect(connectionUri, { useNewUrlParser: true })
  const dbName = await mongod.getDbName()
  const db = await connection.db(dbName)

  await Promise.all([
    db.collection('users').insertMany(users)
  ])
  
  console.log('Finished populating all collections')
  await connection.close()

  global.__MONGOD__ = mongod
  process.env.MONGODB_URL = connectionUri
  

  config({ path: '__tests__/.env' })
  // console.log(process.env.MONGODB_URL, ' .. ', process.env.JWT_SECRET)
}
