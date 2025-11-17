// controllers/housekeeepingServiceController.js
import HousekeepingService from "../models/housekeepingServiceModel.js";

// Create a new housekeeping service
export const createHousekeepingService = async (req, res) => {
  try {
    const newService = new HousekeepingService(req.body);
    const savedService = await newService.save();
    res.status(201).json({ success: true, data: savedService });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create housekeeping service', error: error.message });
  }
};

// Get all housekeeping services
export const getAllHousekeepingServices = async (req, res) => {
  try {
    const services = await HousekeepingService.find();
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch housekeeping services', error: error.message });
  }
};

// Update a housekeeping service by ID
export const updateHousekeepingService = async (req, res) => {
  try {
    const updatedService = await HousekeepingService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ success: false, message: 'Housekeeping service not found' });
    }
    res.status(200).json({ success: true, data: updatedService });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update housekeeping service', error: error.message });
  }
};

// Delete a housekeeping service by ID
export const deleteHousekeepingService = async (req, res) => {
  try {
    const deletedService = await HousekeepingService.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ success: false, message: 'Housekeeping service not found' });
    }
    res.status(200).json({ success: true, message: 'Housekeeping service deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete housekeeping service', error: error.message });
  }
};
