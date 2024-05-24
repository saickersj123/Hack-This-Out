const mongoose = require('mongoose');

const ExampleSchema = new mongoose.Schema({
    numericId: {
        type: Number,
        required: true,
        unique: true
      },
    title: {
        type: String,
        requried: true,
    },
    content: [String],
    answer: [String],
    theme: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Example = mongoose.model('Example', ExampleSchema)