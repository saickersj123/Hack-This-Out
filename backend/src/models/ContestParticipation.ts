import mongoose from 'mongoose';

const ContestParticipationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest',
        required: true
    },
    // Participation-specific timings
    participationStartTime: {
        type: Date,
        default: null // Will be set when the instance becomes "running"
    },
    participationEndTime: {
        type: Date,
        default: null
    },
    hintsUsed: {
        type: Number,
        default: 0
    },
    usedHints: [{
        machine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Machine',
            required: true
        },
        hints: {
            type: [String],
            default: []
        }
    }],
    remainingHints: {
        type: Number,
        default: 0
    },
    expEarned: {
        type: Number,
        default: 0
    },
    machineCompleted: [{
        machine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Machine',
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }],
    contestCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const ContestParticipation = mongoose.model('ContestParticipation', ContestParticipationSchema);

export default ContestParticipation;
