require('module-alias/register')
require('./env')

const app = require('@src/app')

app.listen(3000, function(){
  console.log('App working at ', 3000)
})
