import express from 'express';
import Timetable from '../models/Timetable.js';

const router = express.Router();

// Get timetable for a user/department
router.get('/:userId?', async (req, res) => {
    try {
        const { userId } = req.params;
        const { department } = req.query;

        const query = {};
        
        // If userId is provided and not "undefined" string (frontend might send it), filter by it
        if (userId && userId !== 'undefined' && userId !== 'null') {
            query.userId = userId;
        }

        if (department) query.department = department;

        // If no userId and no department, return error
        if (!query.userId && !query.department) {
             return res.status(400).json({ success: false, message: 'UserId or Department is required' });
        }

        const timetable = await Timetable.findOne(query).sort({ updatedAt: -1 });

        if (!timetable) {
            // If searching by userId failed, try searching by department only (fallback for students viewing faculty timetables)
            if (query.userId && department) {
                 const publicTimetable = await Timetable.findOne({ department }).sort({ updatedAt: -1 });
                 if (publicTimetable) {
                     return res.json({ success: true, timetable: publicTimetable });
                 }
            }
            return res.status(404).json({ success: false, message: 'Timetable not found' });
        }

        res.json({ success: true, timetable });
    } catch (error) {
        console.error('Get Timetable Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

// Save or Update timetable
router.post('/', async (req, res) => {
    try {
        const { userId, department, semester, academicYear, date, classInCharge, courses, schedule, rowHeights } = req.body;

        if (!userId || !department) {
            return res.status(400).json({ success: false, message: 'UserId and Department are required' });
        }

        // Find existing and update, or create new
        let timetable = await Timetable.findOne({ userId, department });

        if (timetable) {
            timetable.schedule = schedule;
            timetable.rowHeights = rowHeights || timetable.rowHeights;
            timetable.semester = semester || timetable.semester;
            timetable.academicYear = academicYear || timetable.academicYear;
            timetable.date = date || timetable.date;
            timetable.classInCharge = classInCharge || timetable.classInCharge;
            timetable.courses = courses || timetable.courses;
            await timetable.save();
        } else {
            timetable = new Timetable({
                userId,
                department,
                semester,
                academicYear,
                date,
                classInCharge,
                courses,
                schedule,
                rowHeights
            });
            await timetable.save();
        }

        res.json({ success: true, message: 'Timetable saved successfully', timetable });

    } catch (error) {
        console.error('Save Timetable Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

export default router;
