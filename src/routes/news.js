const express = require('express')
const news = express.Router()
const axios = require('axios')
const Comment = require('../models/comment')

news.get('', async(req, res) => {

    try {
        const newsReq = await axios.get(`https://techcrunch.com/wp-json/wp/v2/posts?per_page=12`)
        res.render('news', { newsArticles : newsReq.data })
    } catch (err) {
        res.render('news', { newsArticles : null })
        if (err.response) {
            console.log(err.response.status)
            console.log(err.response.headers)
        }
        else if (err.request) {
            console.log(err.request)
        }
        else {
            console.error('Error', err.message)
        }
    }
})

news.get('/:page', async(req, res) => {
    let pageNum = req.params.page

    try {
        const newsReq = await axios.get(`https://techcrunch.com/wp-json/wp/v2/posts?per_page=12&page=${pageNum}`)
        res.render('news', { newsArticles : newsReq.data })
    }
    catch (err) {
        res.render('news', { newsArticles : null })
        if (err.response) {
            console.log(err.response.status)
            console.log(err.response.headers)
        }
        else if (err.request) {
            console.log(err.request)
        }
        else {
            console.error('Error', err.message)
        }
    }
})

news.get('/article/:id', async(req, res) => {
    let articleId = req.params.id

    try {
        const newsReq = await axios.get(`https://techcrunch.com/wp-json/wp/v2/posts/${articleId}`)
        const comments = await Comment.find({ postID: articleId })
        res.render('article', { article : newsReq.data , comments: comments })
    } catch (err) {
        res.render('article', { article : null })
        if (err.response) {
            console.log(err.response.status)
            console.log(err.response.headers)
        }
        else if (err.request) {
            console.log(err.request)
        }
        else {
            console.error('Error', err.message)
        }
    }
})

news.post('/article/:id', async(req, res) => {
    let articleId = req.params.id
    let username = req.body.username
    let commentText = req.body.comment

    const newComment = new Comment ({
        postID: articleId,
        username: `${username}`,
        comment: `${commentText}`
    })

    newComment.save()
        .then((result) => {
            res.redirect(`/article/${articleId}`)
        })
        .catch((err) => {
            console.log(err)
        })
})

news.post('', async(req, res) => {
    let search = req.body.search

    try {
        const newsReq = await axios.get(`https://techcrunch.com/wp-json/wp/v2/posts?search=${search}`)
        res.render('news', { newsArticles : newsReq.data })
    } catch (err) {
        res.render('news', { newsArticles : null })
        if (err.response) {
            console.log(err.response.status)
            console.log(err.response.headers)
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