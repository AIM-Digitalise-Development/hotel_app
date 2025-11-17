import express from 'express';
import {
  createLaundryServiceEntry,
  getAllLaundryServiceEntries,
  updateLaundryServiceEntry,
  deleteLaundryServiceEntry,
} from '../controllers/laundryController.js';

const router = express.Router();

// Route to add a new laundry service entry
router.post('/', createLaundryServiceEntry);

// Route to get all laundry service entries
router.get('/', getAllLaundryServiceEntries);

// Route to update a specific laundry service entry by ID
router.put('/:id', updateLaundryServiceEntry);

// Route to delete a specific laundry service entry by ID
router.delete('/:id', deleteLaundryServiceEntry);

export default router;
