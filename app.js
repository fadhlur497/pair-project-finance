// Happy coding guys
const express = require('express')
const routes = require('./routes/index')
const app = express()
const session = require('express-session')
const port = 3000

app.set('view engine','ejs')
app.use(express.urlencoded({ extended:false}))
app.use(express.static(__dirname + '/views'));
app.use(session({
  secret: 'keyborad cat',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
  }
}))

app.use('/', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})