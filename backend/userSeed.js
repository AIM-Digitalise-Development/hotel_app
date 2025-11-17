import User from './models/User.js';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const userRegister = async () => {
    try {
        await connectDB(); // IMPORTANT

        // Check if admin already exists
        const adminExist = await User.findOne({ email: "admin@gmail.com" });
        if (adminExist) {
            console.log("Admin already exists.");
            process.exit(0);
        }

        const hashPassword = await bcrypt.hash("admin", 10);

        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin",
        });

        await newUser.save();
        console.log("Admin user created successfully.");

        process.exit(0);
    } catch (error) {
        console.log("Error:", error);
        process.exit(1);
    }
};

userRegister();
