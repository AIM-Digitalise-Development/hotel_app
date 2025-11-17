import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  markAttendance,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", createEmployee); // Add a new employee
router.get("/", getEmployees); // Get all employees
router.get("/:id", getEmployeeById); // Get a single employee by ID
router.put("/:id", updateEmployee); // Update an employee
router.delete("/:id", deleteEmployee); // Delete an employee
router.post("/attendance", markAttendance); // Mark attendance

export default router;
