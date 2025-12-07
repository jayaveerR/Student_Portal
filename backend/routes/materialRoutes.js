import express from 'express';
import multer from 'multer';
import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';
import Material from '../models/Material.js';

const router = express.Router();

// Configure Multer for file upload (temporarily store in imports or memory)
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const {
            collegeName,
            facultyName,
            course,
            semester,
            title,
            description,
            subject,
            unit,
        } = req.body;

        const file = req.file;

        if (!file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        // Pinata API Config
        const pinataApiKey = process.env.PINATA_API_KEY;
        const pinataSecretApiKey = process.env.PINATA_API_SECRET;

        // Prepare FormData for Pinata
        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.path));

        const pinataMetadata = JSON.stringify({
            name: title,
            keyvalues: {
                college: collegeName,
                course: course,
                subject: subject
            }
        });
        formData.append('pinataMetadata', pinataMetadata);

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        });
        formData.append('pinataOptions', pinataOptions);

        console.log('Uploading to Pinata...');

        // Upload to Pinata
        const pinataRes = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey,
            },
        });

        const cid = pinataRes.data.IpfsHash;
        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;

        console.log('Pinned to IPFS:', cid);

        // Clean up local file
        fs.unlinkSync(file.path);

        // Save to MongoDB
        const newMaterial = new Material({
            collegeName,
            facultyName,
            course,
            semester,
            title,
            description,
            subject,
            unit,
            cid,
            ipfsUrl,
        });

        const savedMaterial = await newMaterial.save();

        res.json(savedMaterial);
    } catch (err) {
        console.error('Error uploading material:', err.message);
        // Cleanup file if error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).send('Server Error');
    }
});

// Get all materials
router.get('/', async (req, res) => {
    try {
        const materials = await Material.find().sort({ uploadedAt: -1 });
        res.json(materials);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
