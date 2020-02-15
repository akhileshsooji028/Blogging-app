const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signupSch = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('signup', signupSch);