import express from "express";
import { login,verify } from "../controllers/authController.js";
import authMiddleware from '../middleware/authMiddleware.js'
// import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
// router.post("/signup", signup);
router.post("/login", login);
router.get('/verify',authMiddleware,verify)
// Protected route (example)
// router.get("/admin/dashboard", verifyToken, authorizeRoles(["admin"]), (req, res) => {
//   res.status(200).json({ message: "Welcome to the admin dashboard!" });
// });

export default router;
