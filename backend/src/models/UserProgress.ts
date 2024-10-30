import mongoose from 'mongoose';
import Machine from './Machine';
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
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

UserProgressSchema.methods.getTimeSpent = function(createdAt: Date, updatedAt: Date): number {
    return updatedAt.getTime() - createdAt.getTime();
};

const UserProgress = mongoose.model('UserProgress', UserProgressSchema);

export default UserProgress;
