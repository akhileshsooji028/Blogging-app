const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSch = new Schema({
    blogId: {
        type: String
    },
    blogInfo: {},
    comment: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('comments', commentSch);