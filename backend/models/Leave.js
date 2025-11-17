import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  leaveType: {
    type: String,
    enum: ["Casual Leave", "Sick Leave", "Annual Leave"],
    required: true,
  },
  leaveDuration: {
    type: String,
    enum: ["FD", "FH", "SH"], // Full Day (FD), First Half (FH), Second Half (SH)
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["Approved", "Rejected", "Pending"],
    default: "Pending",
  },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  totalDays: { type: Number, required: true } 
});

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
