import Leave from './../models/Leave.js';
import Employee from './../models/Employee.js';


const addLeave = async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      
      const { userId, leaveType, startDate, endDate, reason, startHalf, endHalf } = req.body;
      const supportingDocument = req.file ? req.file.path : null; // Get the uploaded file path
  
      // Validate input fields
      if (!userId || !leaveType || !startDate || !endDate || !reason) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
  
      // Calculate leaveDuration based on startHalf and endHalf
      let leaveDuration = "FD"; // Default leave duration
      if (startHalf && endHalf) {
        leaveDuration = "FH"; // Adjust as needed based on logic
      }
  
      // Parse and validate dates
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ success: false, error: "Invalid date format" });
      }
  
      // Find the employee
      const employee = await Employee.findOne({ userId });
      if (!employee) {
        return res.status(404).json({ success: false, error: "Employee not found" });
      }
  
      // Calculate total leave days based on leaveDuration
      let totalDays = 0;
      if (leaveDuration === "FD") {
        totalDays = Math.ceil((end - start) / (1000 * 3600 * 24)) + 1;
      } else if (leaveDuration === "FH" || leaveDuration === "SH") {
        totalDays = Math.ceil((end - start) / (1000 * 3600 * 24));
        if (startDate === endDate) {
          totalDays += 0.5;
        }
      }
  
      // Debug logging
      console.log(`Start: ${start}, End: ${end}, TotalDays: ${totalDays}`);
  
      // Create a new leave record, including the file path
      const newLeave = new Leave({
        employeeId: employee._id,
        leaveType,
        startDate,
        endDate,
        reason,
        leaveDuration,
        totalDays,
        supportingDocument, // Save the file path in the database
      });
  
      await newLeave.save();
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error in addLeave:", error.message);
      return res.status(500).json({ success: false, error: "Server error in addLeave" });
    }
  };

const getLeave = async (req, res) => {
    try {
        const { id, role } = req.params;
        let leaves;

        if (role === "admin") {
            leaves = await Leave.find({ employeeId: id });
        } else {
            const employee = await Employee.findOne({ userId: id });
            if (!employee) {
                return res.status(404).json({ success: false, error: "Employee not found" });
            }
            leaves = await Leave.find({ employeeId: employee._id });
        }

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.error("Error in getLeave:", error.message);
        return res.status(500).json({ success: false, error: "Server error in getLeave" });
    }
};

const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                { path: 'department', select: 'dep_name' },
                { path: 'userId', select: 'name' },
                { path: "designation", select: "designationName" }
            ]
        });

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.error("Error in getLeaves:", error.message);
        return res.status(500).json({ success: false, error: "Server error in getLeaves" });
    }
};

const getLeaveDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findById(id).populate({
            path: "employeeId",
            populate: [
                { path: 'department', select: 'dep_name' },
                { path: 'userId', select: 'name profileImage' }
            ]
        });

        if (!leave) {
            return res.status(404).json({ success: false, error: "Leave not found" });
        }

        return res.status(200).json({ success: true, leave });
    } catch (error) {
        console.error("Error in getLeaveDetail:", error.message);
        return res.status(500).json({ success: false, error: "Server error in getLeaveDetail" });
    }
};

const updateLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, error: "Missing status field" });
        }

        const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
        if (!leave) {
            return res.status(404).json({ success: false, error: "Leave not found" });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error in updateLeave:", error.message);
        return res.status(500).json({ success: false, error: "Server error in updateLeave" });
    }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
