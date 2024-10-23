import mongoose from 'mongoose';
import UserProgress from './UserProgress';

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
    token: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    exp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    progress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProgress' }],
    isAdmin: { 
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', UserSchema);
export default User;
