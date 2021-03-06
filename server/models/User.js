const mongoose = require('mongoose')

const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        collection: "person"
    }
)

const User = mongoose.model('User', user);

// Default Export
module.exports = User;
