const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = 5000

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))

// Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended : true}))

// Routes
const news = require('./src/routes/news')
app.use('/', news)

// Connecting to the DB
const dbURI = 'mongodb://localhost:27017/news'
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((result) => {
        console.log('App connected to the DB')
        // Listening on port 5000
        app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
    })
    .catch((err) => {
        console.log(err)
    })

