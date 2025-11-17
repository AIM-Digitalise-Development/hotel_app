import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addDesignation, getDesignations, getDesignation, updateDesignation, deleteDesignation } from '../controllers/designationController.js';

const router = express.Router();

// Route to get all designations
router.get('/', authMiddleware, getDesignations);

// Route to add a new designation
router.post('/add', authMiddleware, addDesignation);

// Route to get a specific designation by ID
router.get('/:id', authMiddleware, getDesignation);

// Route to update a designation by ID
router.put('/:id', authMiddleware, updateDesignation);

// Route to delete a designation by ID
router.delete('/:id', authMiddleware, deleteDesignation);

export default router;
