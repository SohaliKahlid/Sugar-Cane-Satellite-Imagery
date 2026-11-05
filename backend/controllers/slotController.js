import Slot from '../models/Slot.js';

// Get all slots
export const getSlots = async (req, res) => {
  try {
    const slots = await Slot.find().sort({ createdAt: -1 });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Save a new slot and field data
export const createSlot = async (req, res) => {
  try {
    const { name, boundary, crop, from, to } = req.body;
    if (!name || !boundary || !crop || !from || !to) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const slot = new Slot({ name, boundary, crop, from, to });
    await slot.save();
    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a slot by ID
export const updateSlot = async (req, res) => {
  try {
    const slot = await Slot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a slot by ID
export const deleteSlot = async (req, res) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
