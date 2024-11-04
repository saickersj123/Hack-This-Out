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
    participationEndTime: Date,
    hintsUsed: {
        type: Number,
        default: 0
    },
    expEarned: {
        type: Number,
        default: 0
    }
});

const ContestParticipation = mongoose.model('ContestParticipation', ContestParticipationSchema);

export default ContestParticipation;
