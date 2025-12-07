import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Event"
    },
    course: {
        type: String, // e.g., "MCA", "MBA"
        required: true
    },
    excelData: {
        type: Array, // Store parsed Excel rows
        default: []
    },
    pdfUrl: {
        type: String, // Store path or URL to PDF
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'events' });

export default mongoose.model('Event', eventSchema);
