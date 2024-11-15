import mongoose from 'mongoose';

const ContestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: '',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    machines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine',
        required: true
    }],
    contestExp: {
        type: Number,
        required: true,
        default: 100
    },
}, {
    timestamps: true
});

const Contest = mongoose.model('Contest', ContestSchema);

export default Contest;
