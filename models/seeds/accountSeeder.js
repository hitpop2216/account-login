db = require('../../config/mongoose')
const users = require('../../users')
const Account = require('../account')
db.once('open', () => {
  Account.create(users)
  console.log('done!')
})