import Customer from '../models/CustomerModel.js';

// Get all customers
export const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new customer
export const addCustomer = async (req, res) => {
    const { name, phone, email, govt_id_type, govt_id_number, address } = req.body;
    const govt_id_file = req.file ? req.file.path : null;

    try {
        const customerID = `CUS${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 100)}`;
        const customer = new Customer({
            customerID,
            name,
            phone,
            email,
            govt_id_type,
            govt_id_number,
            govt_id_file,
            address,
        });
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a customer
export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, phone, email, govt_id_type, govt_id_number, address } = req.body;
    const govt_id_file = req.file ? req.file.path : req.body.existingFile;

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { name, phone, email, govt_id_type, govt_id_number, govt_id_file, address },
            { new: true }
        );

        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a customer
export const deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        await Customer.findByIdAndDelete(id);
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
