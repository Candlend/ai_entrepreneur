const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'preorders.json');

app.use(express.json());
app.use(express.static(__dirname));

// Initialize data file
async function initDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify([]));
    }
}

// POST /api/preorder - Submit preorder
app.post('/api/preorder', async (req, res) => {
    try {
        const { email, phone } = req.body;

        if (!email || !phone) {
            return res.status(400).json({ error: 'Email and phone are required' });
        }

        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));

        data.push({
            email,
            phone,
            timestamp: new Date().toISOString()
        });

        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));

        res.json({ success: true, message: 'Preorder submitted successfully' });
    } catch (error) {
        console.error('Error saving preorder:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/preorders - Get all preorders
app.get('/api/preorders', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
        res.json({ count: data.length, preorders: data });
    } catch (error) {
        console.error('Error reading preorders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

initDataFile().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
