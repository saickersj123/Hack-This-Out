import mongoose from 'mongoose';

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
    role: { // New field for user roles
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    exp: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('user', UserSchema);

export default User;