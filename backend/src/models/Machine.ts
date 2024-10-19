import mongoose from 'mongoose';

// Review Schema
const ReviewSchema = new mongoose.Schema({
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewerName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number, // Added rating field
        required: true,
        min: 1.0,
        max: 5.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Machine Schema
const MachineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: { 
        type: String, 
        required: true
    },
    info: {
        type: String
    },
    exp: {
        type: Number,
        required: true
    },
    amiId: { // New field for AMI ID
        type: String,
        required: true,
        unique: true
    },
    flag: { // New field for Flag
        type: String,
        required: true
    },
    repute: {
        type: Number,
        default: 0.0 // Average rating
    },
    reviews: [ReviewSchema]
}, {
    timestamps: true
});

// Function to update average repute after adding a review
MachineSchema.methods.updateRepute = function() {
    if (this.reviews.length === 0) {
        this.repute = 0.0;
    } else {
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.repute = totalRating / this.reviews.length; // Calculate average rating
    }
    return this.save();
};

const Machine = mongoose.model('Machine', MachineSchema);

export default Machine;
