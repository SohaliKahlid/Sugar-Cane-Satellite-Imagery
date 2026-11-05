import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
