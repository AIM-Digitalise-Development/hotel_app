// routes/roomCategoryRoutes.js
import express from 'express';
import {
  createRoomCategory,
  getAllRoomCategories,
  getRoomCategoryById,
  updateRoomCategory,
  deleteRoomCategory,
} from '../controllers/roomCategoryController.js';

const router = express.Router();

router.post('/', createRoomCategory); // Create a category
router.get('/', getAllRoomCategories); // Get all categories
router.get('/:id', getRoomCategoryById); // Get category by ID
router.put('/:id', updateRoomCategory); // Update category
router.delete('/:id', deleteRoomCategory); // Delete category

export default router;
