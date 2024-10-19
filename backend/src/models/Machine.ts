import mongoose from 'mongoose';

// 리뷰 스키마
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
        type: Number, // 별점 필드 추가
        required: true,
        min: 1.0,
        max: 5.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 머신 스키마
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
    repute: {
        type: Number,
        default: 0.0 // 평균 별점
    },
    reviews: [ReviewSchema]
}, {
    timestamps: true
});

// 리뷰 추가 후 평균 별점 계산 함수
MachineSchema.methods.updateRepute = function() {
    if (this.reviews.length === 0) {
        this.repute = 0.0;
    } else {
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.repute = totalRating / this.reviews.length; // 평균 별점 계산
    }
    return this.save();
};

const Machine = mongoose.model('Machine', MachineSchema);

export default Machine;
