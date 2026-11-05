import express from 'express';
import { makePrediction, getPredictions } from '../controllers/predictionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Make a prediction for a field
router.post('/:fieldId', protect, makePrediction);

// Get all predictions for the logged-in user
router.get('/', protect, getPredictions);

export default router;
