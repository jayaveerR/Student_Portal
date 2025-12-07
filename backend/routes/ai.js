import express from 'express';
const router = express.Router();

router.post('/enhance', async (req, res) => {
    try {
        const { text, type } = req.body;

        if (!text) {
            return res.status(400).json({ success: false, message: 'Text is required' });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ success: false, message: 'OpenAI API Key not configured' });
        }

        let prompt = '';
        if (type === 'summary') {
            prompt = `Professionalize and enhance the following resume summary... "${text}"`;
        } else if (type === 'experience') {
            prompt = `Enhance this job description for a resume... "${text}"`;
        } else {
            prompt = `Professionalize this text for a resume: "${text}"`;
        }

        // OpenAI API endpoint
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                max_tokens: 200
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error('OpenAI API Error:', data.error);
            return res.status(500).json({
                success: false,
                message: 'AI Service Error',
                error: data.error.message
            });
        }

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('Unexpected OpenAI response:', data);
            return res.status(500).json({
                success: false,
                message: 'Unexpected AI response format'
            });
        }

        const enhancedText = data.choices[0].message.content.trim();

        res.json({
            success: true,
            enhancedText
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
});

export default router;
