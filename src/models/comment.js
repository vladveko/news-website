const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    postID: { type: Number, required: true },
    username: { type: String, required: true },
    comment: { type: String, required: true}
}, { timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment