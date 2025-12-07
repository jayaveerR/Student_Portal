import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    rollNumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        // Name might be fetched or entered manually
    },
    amount: {
        type: Number,
        required: true
    },
    items: [{
        type: String
    }],
    paymentMethod: {
        type: String,
        enum: ['cash', 'phonepe', 'online'],
        default: 'cash'
    },
    course: String, // Store the course context for this payment
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'money' });

export default mongoose.model('Payment', paymentSchema);
