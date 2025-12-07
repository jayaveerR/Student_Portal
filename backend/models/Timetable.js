import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
    userId: {
        type: String, // Storing as string for flexibility, could be ObjectId if strict
        required: true
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        default: '1'
    },
    academicYear: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    classInCharge: {
        type: String,
        required: false
    },
    docRef: {
        type: String,
        required: false
    },
    courses: [{
        code: String,
        title: String,
        facultyName: String,
        facultyId: String
    }],
    schedule: {
        type: mongoose.Schema.Types.Mixed, // Storing complex grid data: { "Monday": [{ id, value, colSpan, rowSpan, ... }] }
        default: {}
    },
    rowHeights: {
        type: mongoose.Schema.Types.Mixed, // Map of Day -> Height (e.g., "Monday" -> "60px")
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
timetableSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Timetable = mongoose.model('Timetable', timetableSchema);

export default Timetable;
