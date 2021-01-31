const express = require('express')

const app = express()
const port = 5000

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))

// Templating Engine
app.set('views', './src/views/pages')
app.set('view engine', 'ejs')

// Routes
const news = require('./src/routes/news')

app.use('/', news)

// Listening on port 5000
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))