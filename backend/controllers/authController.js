import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    userNumber: req.user.userNumber,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
  });
};

import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

// @desc    Forgot password (send reset link)
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log('Forgot password request:', email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Always return success for security
      return res.status(200).json({ message: 'If this email is registered, a password reset link has been sent.' });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();

    // Send email
    const resetUrl = `${process.env.BASE_URL}/reset-password/${token}`;
    const html = `<p>You requested a password reset.</p>
      <p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`;
    await sendEmail(user.email, 'Password Reset', html);

    return res.status(200).json({ message: 'If this email is registered, a password reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  const userId = req.user._id;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Find the highest userNumber
    const lastUser = await User.findOne({ userNumber: { $exists: true } }).sort({ userNumber: -1 });
    const nextUserNumber = lastUser ? lastUser.userNumber + 1 : 1;
    const user = await User.create({ name, email, password, userNumber: nextUserNumber });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userNumber: user.userNumber,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.setHeader('Cache-Control', 'no-store');
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        userNumber: user.userNumber,
        token: generateToken(user._id),
        });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
