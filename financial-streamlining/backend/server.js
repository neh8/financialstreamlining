// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to test server
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Route to calculate investor assessment
app.post('/assessment', (req, res) => {
    const { answers } = req.body; // expecting an array of 12 answers (A/B/C/D)
    
    if (!answers || answers.length !== 12) {
        return res.status(400).json({ error: "Provide 12 answers" });
    }

    // Convert answers to points
    const points = answers.map(ans => {
        switch(ans.toUpperCase()) {
            case 'A': return 1;
            case 'B': return 2;
            case 'C': return 3;
            case 'D': return 4;
            default: return 0;
        }
    });

    const totalScore = points.reduce((sum, val) => sum + val, 0);

    // Determine user level
    let level = '';
    if (totalScore >= 12 && totalScore <= 20) level = 'Beginner';
    else if (totalScore >= 21 && totalScore <= 32) level = 'Intermediate';
    else if (totalScore >= 33 && totalScore <= 48) level = 'Advanced';
    else level = 'Unknown';

    res.json({ totalScore, level });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
