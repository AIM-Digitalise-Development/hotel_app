import Service from '../models/ServiceModel.js';

// Create a new service
const createService = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const newService = new Service({ name, category, price });
    await newService.save();
    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (err) {
    res.status(500).json({ message: 'Error adding service', error: err.message });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services); // Sends back all services in JSON format
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

export { createService, getAllServices };
