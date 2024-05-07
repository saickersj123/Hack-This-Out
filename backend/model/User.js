const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema)