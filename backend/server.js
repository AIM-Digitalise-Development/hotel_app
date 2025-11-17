import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import departmentRouter from './routes/department.js';
import designationRouter from './routes/designation.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';
import dashboardRouter from './routes/dashboard.js';
import roomCategoryRoutes from './routes/roomCategoryRoutes.js';
import roomEntryRoutes from './routes/roomEntryRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import laundryRoutes from './routes/laundryRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import carRoutes from './routes/carRoutes.js';
import housekeepingServiceRoutes from './routes/housekeepingServiceRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import serviceRoute from './routes/serviceRoute.js';
import bookingRoutes from './routes/bookingRoutes.js';
import guestRoutes from './routes/guestRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Removed: app.use(express.static("public/uploads")) 
// Removed: Old multer disk storage and /api/upload-image route

// Test Route
app.get('/test', (req, res) => {
  res.send('HMS Backend with Cloudinary is running!');
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRouter);
app.use("/api/designations", designationRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", dashboardRouter);
app.use('/api/room-categories', roomCategoryRoutes);
app.use('/api/rooms', roomEntryRoutes);
app.use('/api/room-entries', roomEntryRoutes);
app.use("/api/foods", foodRoutes);
app.use('/api/laundry-services', laundryRoutes);
app.use('/api', itemRoutes);
app.use('/api', carRoutes);
app.use('/api', housekeepingServiceRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/services', serviceRoute);
app.use('/api/bookings', bookingRoutes);
app.use('/api', guestRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});