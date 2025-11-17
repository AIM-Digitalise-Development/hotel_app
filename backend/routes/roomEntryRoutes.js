import express from 'express';
import upload from '../middleware/upload.js'; // New memory-based upload
import {
  addRoomEntry,
  getRoomEntries,
  getRoomById,
  getRoomEntry,
  updateRoomEntry,
  deleteRoomEntry
} from '../controllers/roomEntryController.js';

const router = express.Router();

router.post('/add', upload.array('images', 10), addRoomEntry);
router.get('/', getRoomEntries);
router.get('/:id', getRoomById);
router.get('/available', getRoomEntry);
router.put('/:id', upload.array('images', 10), updateRoomEntry); // Allow image update
router.delete('/:id', deleteRoomEntry);

export default router;