import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
// import fieldRoutes from './routes/fieldRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';
import predictionRoutes from './routes/predictionRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import slotRoutes from './routes/slotRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

// Connect to MongoDB

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/fields', fieldRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/slots', slotRoutes);

// Error handling middleware
app.use(errorHandler);

// CURRENT CONFIGURATION: Alternative port 5005 (via process.env.PORT or default 5005)
// ORIGINAL CONFIGURATION: Default port 5000 (const PORT = process.env.PORT || 5000;)
const PORT = process.env.PORT || 5005;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
export default app;
