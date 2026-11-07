import axios from 'axios';
import Prediction from '../models/Prediction.js';
import Slot from '../models/Slot.js';

// @desc    Make a prediction for a slot
// @route   POST /api/predictions/:slotId
// @access  Private
export const makePrediction = async (req, res) => {
  const { slotId } = req.params; // Use slotId, not fieldId
  try {
    // Get the slot boundary and date
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    // CURRENT & ORIGINAL CONFIGURATION: Flask AI microservice on port 5001
    const flaskUrl = process.env.FLASK_API_URL || 'http://localhost:5001/predict';
    const flaskRes = await axios.post(flaskUrl, {
      boundary: slot.boundary,
      from: slot.from, // send date if Flask API expects it
    });

    // Save prediction result (ensure all model output is stored)
    const prediction = await Prediction.create({
      user: req.user._id,
      field: slot._id, // Now references Slot
      result: flaskRes.data, // Save the full Flask response here!
    });

    res.status(201).json(prediction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all predictions for the logged-in user
// @route   GET /api/predictions
// @access  Private
export const getPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({ user: req.user._id }).populate('field');
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
