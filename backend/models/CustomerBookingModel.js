import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    customerID: {
      type: String,
      unique: true,
      default: () => `CUS${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 100)}`,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // Ensures a valid 10-digit phone number
    },
    email: {
      type: String,
      default: null,
      match: /^\S+@\S+\.\S+$/, // Ensures a valid email format
    },
    govt_id_type: {
      type: String,
      enum: ['Aadhar Card', 'Voter ID', 'Driving License'],
      required: true,
      set: (value) => {
        const mapping = {
          Aadhar: 'Aadhar Card',
          Voter: 'Voter ID',
          License: 'Driving License',
        };
        return mapping[value] || value;
      },
    },
    govt_id_number: {
      type: String,
      required: true,
      unique: true,
    },
    govt_id_file: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Avoid model overwrite by checking if it's already compiled
const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;
