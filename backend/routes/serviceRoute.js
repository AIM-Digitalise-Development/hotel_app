import express from 'express';
import { createService, getAllServices } from '../controllers/serviceController.js';

const router = express.Router();

// Route to create a new service (POST)
router.post('/', createService);

// Route to get all services (GET)
router.get('/', getAllServices); // This is what will fetch the services

export default router;
