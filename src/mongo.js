// const { MongoClient } = require('mongodb')
const logger = require('@src/logger')('Mongoose')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

const db = mongoose.connection
db.on('error', () => logger.error('Cannot connect Mongodb'))
db.once('open', function() {
  logger.info('Mongodb Connected')
});


/* class DB {
  constructor() {
    this.connection = this.connect()
  }

  async connect() {
    console.log('connecting .....', process.env.MONGODB_URL)
    return await new MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  }

  async getDB() {
    const client = await this.connection
    return client.db('expro')
  }

  async getClient() {
    return await this.connection
  }
}
module.exports = new DB()


 */