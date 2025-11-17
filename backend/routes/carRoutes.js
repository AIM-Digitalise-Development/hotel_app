// routes/carRoutes.js
import express from 'express';
import {
  createCarEntry,
  getAllCarEntries,
  updateCarEntry,
  deleteCarEntry,
} from '../controllers/carController.js';

const router = express.Router();

// Route to create a new car entry
router.post('/car-entry', createCarEntry);

// Route to get all car entries
router.get('/car-entries', getAllCarEntries);

// Route to update a car entry by ID
router.put('/car-entry/:id', updateCarEntry);

// Route to delete a car entry by ID
router.delete('/car-entry/:id', deleteCarEntry);

export default router;
