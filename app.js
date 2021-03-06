const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
require('dotenv').config()
const userRoutes = require('./routes/index')
const adminRoutes = require('./routes/admin')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

mongoose.connect(
  process.env.mongoString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,   
  },
  () => console.log('connected to database!')
);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.static('client'));

app.get('/', (req, res) => res.render('index'))
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/admin', adminRoutes)

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = 5000
app.listen(PORT, () => console.log(`Listening at ${PORT}`))