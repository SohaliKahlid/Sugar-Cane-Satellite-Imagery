import express from 'express';
import { getSlots, createSlot, deleteSlot, updateSlot } from '../controllers/slotController.js';

const router = express.Router();

// GET /api/slots
router.get('/', getSlots);

// POST /api/slots
router.post('/', createSlot);

// PUT /api/slots/:id
router.put('/:id', updateSlot);

// DELETE /api/slots/:id
router.delete('/:id', deleteSlot);

export default router;
