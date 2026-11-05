import express from 'express';
import { submitFeedback } from '../controllers/feedbackController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Submit feedback (authenticated)
router.post('/', protect, submitFeedback);

export default router;
