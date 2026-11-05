import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot', // Now references Slot instead of Field
    required: true,
  },
  result: {
    type: Object, // Store prediction result (NDVI, GNDVI, EVI, yield, etc.)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Prediction = mongoose.model('Prediction', predictionSchema);
export default Prediction;
