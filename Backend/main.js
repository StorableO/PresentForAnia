// ========== express ============
const express = require('express');
const app = express();
// =========== .env variabels ============
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV;

// ========== import=========
const path = require('path');
const fs = require('fs');

const Routes = require('./QuotesBack/QuoteRoutes')

// ======== all pases(usefull routes) ==========
const buildPath = path.join(__dirname, '..', 'Frontend', 'dist');

const connectionDB = require('./Config/database.js')

connectionDB(MONGODB_URI).then(() =>{
    app.use(express.json());
    app.use('/api/quotes', Routes);


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
            error: 'frontend not built', 
            message: 'npm run build need' 
        });
    }
    });

    app.listen(PORT, () => {
    console.log(` Server is running on port: ${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/api/health`);
    console.log(` Frontend: http://localhost:${PORT}/`);
    });

})

module.exports = app;
