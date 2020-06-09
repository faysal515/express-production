module.exports = async function () {
  const mongod = global.__MONGOD__
  if (mongod) {
      console.log('Stop mongod');
      await mongod.stop();
      console.log('Mongod has been stopped')
      process.exit(0)
  }
};