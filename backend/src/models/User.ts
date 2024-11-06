import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true,
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
    exp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    isAdmin: { // Add this field
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Method to update level based on EXP
UserSchema.methods.updateLevel = function() {
    const levels = [0, 100, 300, 600, 1000, 1500, 2100, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]; // Example thresholds
    let newLevel = 1;
    for (let i = 0; i < levels.length; i++) {
        if (this.exp >= levels[i]) {
            newLevel = i + 1;
        } else {
            break;
        }
    }
    if (newLevel !== this.level) {
        this.level = newLevel;
        return this.save();
    }
    return Promise.resolve(this);
};

const User = mongoose.model('user', UserSchema);

export default User;
