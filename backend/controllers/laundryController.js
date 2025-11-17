import LaundryServiceEntry from "../models/LaundryEntry.js";

// Create a new laundry service entry
const createLaundryServiceEntry = async (req, res) => {
  try {
    const { serviceName, description, price, status } = req.body;
    const newLaundryServiceEntry = new LaundryServiceEntry({
      serviceName,
      description,
      price,
      status,
    });

    await newLaundryServiceEntry.save();
    res.status(201).json({
      success: true,
      message: "Laundry Service Entry created successfully",
      data: newLaundryServiceEntry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all laundry service entries
const getAllLaundryServiceEntries = async (req, res) => {
  try {
    const laundryServices = await LaundryServiceEntry.find();
    res.status(200).json({
      success: true,
      data: laundryServices,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a laundry service entry
const updateLaundryServiceEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const laundryService = await LaundryServiceEntry.findByIdAndUpdate(id, updatedData, { new: true });

    if (!laundryService) {
      return res.status(404).json({ success: false, message: "Laundry service entry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Laundry Service Entry updated successfully",
      data: laundryService,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a laundry service entry
const deleteLaundryServiceEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await LaundryServiceEntry.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ success: false, message: "Laundry service entry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Laundry Service Entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  createLaundryServiceEntry,
  getAllLaundryServiceEntries,
  updateLaundryServiceEntry,
  deleteLaundryServiceEntry,
};
