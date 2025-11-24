const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');

const buildPath = path.join(__dirname, '..', 'Frontend', 'dist');

app.use(express.static(buildPath));
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        service: 'aniapage-backend',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).json({ 
            error: 'Frontend not built', 
            message: 'Please run npm run build in Frontend directory' 
        });
    }
});

app.listen(PORT, () => {
    console.log(` Server is running on port: ${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/api/health`);
    console.log(` Frontend: http://localhost:${PORT}/`);
});

module.exports = app;
