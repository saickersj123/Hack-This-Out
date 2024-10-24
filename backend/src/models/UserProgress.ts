import mongoose from 'mongoose';

const UserProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date
    },
    hintsUsed: {
        type: Number,
        default: 0
    },
    expEarned: {
        type: Number,
        default: 0
    },
    timeSpent: {
        type: Number,  // in seconds
        default: 0
    }
}, {
    timestamps: true
});

const UserProgress = mongoose.model('UserProgress', UserProgressSchema);

export default UserProgress;
