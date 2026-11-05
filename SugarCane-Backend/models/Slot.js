import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  boundary: { type: Object, required: true },
  crop: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('Slot', SlotSchema);
