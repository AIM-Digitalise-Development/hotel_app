import { request } from "express";
import Designation from "../models/Designation.js";

// Get all designations with pagination
const getDesignations = async (req, res) => {
    try {
        // Get the current page and limit from the query parameters
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

        // Calculate the skip value based on page and limit
        const skip = (page - 1) * limit;

        // Get the total count of designations
        const totalDesignations = await Designation.countDocuments();

        // Fetch paginated designations and populate department data
        const designations = await Designation.find()
            .skip(skip) // Skip records based on page and limit
            .limit(limit) // Limit the number of records per page
            .populate('department_id', 'dep_name'); // Populating department data

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalDesignations / limit);

        return res.status(200).json({
            success: true,
            designations,
            totalPages, // Send the total number of pages along with the designations
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get designations server error" });
    }
};

// Add a new designation
const addDesignation = async (req, res) => {
    console.log(req.body)
    try {
        const { des_name, description, department_id } = req.body;

        // Check if the designation already exists
        const existingDesignation = await Designation.findOne({ des_name });
        if (existingDesignation) {
            return res.status(400).json({ success: false, error: "Designation already exists" });
        }

        const newDesignation = new Designation({
            des_name,
            description,
            department_id
        });
        await newDesignation.save();
        return res.status(200).json({ success: true, designation: newDesignation });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Add designation server error" });
    }
};

// Get a specific designation by ID
const getDesignation = async (req, res) => {
    try {
        const { id } = req.params;
        const designation = await Designation.findById(id).populate('department_id', 'dep_name');

        if (!designation) {
            return res.status(404).json({ success: false, error: "Designation not found" });
        }

        return res.status(200).json({ success: true, designation });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get designation server error" });
    }
};

// Update a designation
const updateDesignation = async (req, res) => {
    try {
        const { id } = req.params;
        const { des_name, description, department_id } = req.body;

        const updatedDesignation = await Designation.findByIdAndUpdate(
            id,
            { des_name, description, department_id },
            { new: true }
        );

        if (!updatedDesignation) {
            return res.status(404).json({ success: false, error: "Designation not found" });
        }

        return res.status(200).json({ success: true, updatedDesignation });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Update designation server error" });
    }
};

// Delete a designation
const deleteDesignation = async (req, res) => {
    try {
        const { id } = req.params;

        const designationToDelete = await Designation.findById(id);
        if (!designationToDelete) {
            return res.status(404).json({ success: false, error: "Designation not found" });
        }

        await designationToDelete.deleteOne();
        return res.status(200).json({ success: true, message: "Designation deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Delete designation server error" });
    }
};

export { addDesignation, getDesignations, getDesignation, updateDesignation, deleteDesignation };
