import express from 'express';
import multer from 'multer';
import {
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
} from '../controllers/customerController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// Routes
router.get('/', getCustomers);
router.post('/', upload.single('govt_id_file'), addCustomer);
router.put('/:id', upload.single('govt_id_file'), updateCustomer);
router.delete('/:id', deleteCustomer);

router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const customers = await Customer.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { customerID: { $regex: query, $options: 'i' } },
            ],
        });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
