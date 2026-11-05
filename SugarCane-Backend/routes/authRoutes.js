import express from 'express';
import { registerUser, loginUser, getMe, forgotPassword, changePassword } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get current user
router.get('/me', protect, getMe);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Change password
router.post('/change-password', protect, changePassword);

export default router;
