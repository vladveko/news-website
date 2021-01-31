const express = require('express')
const news = express.Router()
const axios = require('axios')

news.get('', async(req, res) => {
    //res.render('news')

    try {
        const newsReq = await axios.get(`https://techcrunch.com/wp-json/wp/v2/posts`)
        res.render('news', { newsArticles : newsReq.data })
    } catch (err) {
        if (err.response) {
            console.log(err.response.status)
            console.log(err.response.headers)
            console.log(err.response.data)
        }
        else if (err.request) {
            console.log(err.request)
        }
        else {
            console.error('Error', err.message)
        }
    }
})

module.exports = news