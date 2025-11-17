import express from 'express';
import {
  getAllFoodEntries,
  addFoodEntry,
  getFoodEntryById,
  deleteFoodEntry,
} from '../controllers/foodController.js';

const router = express.Router();

// Route to fetch all food entries
router.get('/', getAllFoodEntries);

// In your routes file
router.get('/:id', getFoodEntryById);


// Route to add a new food entry
router.post('/', addFoodEntry);

// Route to delete a food entry by ID
router.delete('/:id', deleteFoodEntry);

export default router;
