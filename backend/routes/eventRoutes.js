import express from 'express';
import multer from 'multer';
import XLSX from 'xlsx';
import Event from '../models/Event.js';
import Payment from '../models/Payment.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Create Event & Upload Data
router.post('/upload', upload.fields([{ name: 'excel', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
    try {
        const { title, course } = req.body;

        let excelData = [];
        if (req.files['excel']) {
            const workbook = XLSX.read(req.files['excel'][0].buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            // Treat everything as string to avoid parsing issues, skipping header row if needed
            excelData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        }

        const newEvent = new Event({
            title: title || "New Event",
            course: course || "General",
            excelData,
        });

        await newEvent.save();
        res.status(201).json({ success: true, event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Search Student
router.get('/search', async (req, res) => {
    try {
        const { q, course } = req.query;
        if (!q) return res.json([]);

        // Find the latest event for the specific course (or just latest if no course specified)
        const filter = { excelData: { $exists: true, $not: { $size: 0 } } };
        if (course && course !== "All") {
            filter.course = course;
        }

        // We want the LATEST event matching the course
        const event = await Event.findOne(filter).sort({ createdAt: -1 });

        if (!event || !event.excelData) {
            return res.json([]);
        }

        const queryLower = q.toString().toLowerCase();

        // Search in excelData
        const results = event.excelData.filter(row => {
            return Object.values(row).some(val =>
                String(val).toLowerCase().includes(queryLower)
            );
        }).slice(0, 10);

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Get Latest Event
router.get('/latest', async (req, res) => {
    try {
        const event = await Event.findOne().sort({ createdAt: -1 });
        res.json(event);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Get All Events
router.get('/all', async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Add Payment
router.post('/payment', async (req, res) => {
    try {
        const { rollNumber, name, amount, items, paymentMethod, eventId, course } = req.body;
        const newPayment = new Payment({
            eventId,
            rollNumber,
            name,
            amount,
            items,
            paymentMethod,
            course
        });
        await newPayment.save();
        res.status(201).json({ success: true, payment: newPayment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Get Payments
router.get('/payments', async (req, res) => {
    try {
        const { course, eventId } = req.query;
        let query = {};
        if (course && course !== "All") {
            query.course = course;
        }
        if (eventId) {
            query.eventId = eventId;
        }

        const payments = await Payment.find(query).sort({ date: -1 });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Delete Payment
router.delete('/payment/:id', async (req, res) => {
    try {
        await Payment.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Payment deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Clear All Payments
router.delete('/payments/all', async (req, res) => {
    try {
        await Payment.deleteMany({});
        res.json({ success: true, message: 'All payments cleared' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Delete Event by ID
router.delete('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        // Delete the event
        const event = await Event.findByIdAndDelete(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        // Delete payments associated with this event
        await Payment.deleteMany({ eventId: eventId });

        res.json({ success: true, message: 'Event and associated payments deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
