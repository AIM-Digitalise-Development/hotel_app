import express from 'express';
import {
  createItemEntry,
  getAllItemEntries,
  updateItemEntry,
  deleteItemEntry,
} from '../controllers/itemController.js';

const router = express.Router();

// Route to create a new item entry
router.post('/item-entry', createItemEntry);

// Route to get all item entries
router.get('/item-entries', getAllItemEntries);

// Route to update an item entry by ID
router.put('/item-entry/:id', updateItemEntry);

// Route to delete an item entry by ID
router.delete('/item-entry/:id', deleteItemEntry);

export default router;
