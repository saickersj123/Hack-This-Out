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
      default: 1, // Cost in terms of reward reduction
      max: 10
    }
  }, {
    timestamps: true
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
}, {
    timestamps: true
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
    description: {
        type: String
    },
    exp: {
        type: Number,
        required: true,
        default: 50
    },
    amiId: { 
        type: String,
        required: true,
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
    reviews: {
        type: [ReviewSchema],
        default: []
    },
    hints: {
        type: [HintSchema],
        default: []
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
});

// Function to update average rating after adding/updating/deleting a review
MachineSchema.methods.updateRating = async function() {
    if (!this.reviews || this.reviews.length === 0) { // Added check for reviews undefined
        this.rating = 1.0;
    } else {
        const totalRating = this.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
        this.rating = parseFloat((totalRating / this.reviews.length).toFixed(1)); // Round to one decimal place
    }
    return this.save();
};

const Machine = mongoose.model('Machine', MachineSchema);

export default Machine;
