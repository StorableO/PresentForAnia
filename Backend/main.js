const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const buildPath = path.join(__dirname, '..', 'Frontend', 'dist');

app.use(express.static(buildPath));

app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(` Server is running on port: ${PORT}`);
    console.log(` Serving static files from: ${buildPath}`);
});

module.exports = app; 