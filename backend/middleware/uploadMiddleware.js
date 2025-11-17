import multer from 'multer';
import path from 'path';

// Set up storage for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store the file
  },
  filename: (req, file, cb) => {
    // Use the timestamp to make the filename unique
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Set file filter (optional for restricting file types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Add allowed types
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'), false);
  }
};

// Create the upload instance
const upload = multer({ storage, fileFilter });

// Export the middleware to use it in routes
export default upload;
