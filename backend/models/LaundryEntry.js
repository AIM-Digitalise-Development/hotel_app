import mongoose from "mongoose";

const laundryServiceEntrySchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
  },
  { timestamps: true }
);

const LaundryServiceEntry = mongoose.model("LaundryServiceEntry", laundryServiceEntrySchema);

export default LaundryServiceEntry;
