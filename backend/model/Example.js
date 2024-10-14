import mongoose from 'mongoose';

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

const Example = mongoose.model('Example', ExampleSchema);

export default Example;