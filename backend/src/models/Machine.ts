import mongoose from 'mongoose';
// Hint Schema
const HintSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true,
      default: 1 // Cost in terms of reward reduction
    }
  });

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
        required: true,
        default: 50
    },
    contestExp: { // New field for Contest EXP
        type: Number,
        required: true,
        default: 100
    },
    amiId: { 
        type: String,
        required: true,
        unique: true
    },
    flag: { 
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 1.0
    },
    playerCount: {
        type: Number,
        default: 0
    },
    reviews: [ReviewSchema],
    hints: [HintSchema],
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
});

// Function to update average repute after adding a review
MachineSchema.methods.updateRating = function() {
    if (this.reviews.length === 0) {
        this.rating = 0.0;
    } else {
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.rating = totalRating / this.reviews.length; // Calculate average rating
    }
    return this.save();
};

const Machine = mongoose.model('Machine', MachineSchema);

export default Machine;
