const { urlencoded } = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const Account = require('./models/account')

const PORT = 3000
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})
app.post('/', (req, res) => {
  const postUser = req.body
  Account
    .findOne(postUser)
    .lean()
    .then(data => data ? data : res.redirect('/'))
    .then(data => res.render('show', { data }))
    .catch(err => console(err))
})


app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}`)
})