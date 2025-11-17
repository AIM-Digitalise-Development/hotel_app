// routes/housekeepingServiceRoutes.js
import express from 'express';
import {
  createHousekeepingService,
  getAllHousekeepingServices,
  updateHousekeepingService,
  deleteHousekeepingService,
} from '../controllers/housekeepingServiceController.js';

const router = express.Router();

// Route to create a new housekeeping service
router.post('/housekeeping-service', createHousekeepingService);

// Route to get all housekeeping services
router.get('/housekeeping-services', getAllHousekeepingServices);

// Route to update a housekeeping service by ID
router.put('/housekeeping-service/:id', updateHousekeepingService);

// Route to delete a housekeeping service by ID
router.delete('/housekeeping-service/:id', deleteHousekeepingService);

export default router;
