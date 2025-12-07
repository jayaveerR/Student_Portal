import mongoose from 'mongoose';

const MaterialSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        required: true,
    },
    facultyName: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    subject: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
    },
    tags: {
        type: [String],
        default: [],
    },
    cid: {
        type: String,
        required: true,
    },
    ipfsUrl: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Material', MaterialSchema);
