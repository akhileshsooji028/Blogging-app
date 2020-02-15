const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsSch = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        data: Buffer,
        contentType: String
    },
    likes: { type: Number },
    dislikes: { type: Number },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('blogs', blogsSch);