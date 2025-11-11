import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4173;

if (isNaN(PORT)) {
    console.error(' Invalid PORT environment variable');
    process.exit(1);
}

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(` Server running on port ${PORT}`);
    console.log(` Access your app at: http://localhost:${PORT}`);
    console.log(`  Health check: http://localhost:${PORT}/health`);
});