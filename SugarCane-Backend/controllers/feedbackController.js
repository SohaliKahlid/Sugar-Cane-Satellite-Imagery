import Feedback from '../models/Feedback.js';

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private (requires authentication)
export const submitFeedback = async (req, res) => {
  const { username, email, subject, message } = req.body;
  try {
    const feedback = new Feedback({
      username,
      email,
      subject,
      message,
      user: req.user ? req.user._id : undefined,
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
