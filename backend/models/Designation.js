import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({
  des_name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` field before saving
designationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to handle cascading deletes if required
designationSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    // If related entities depend on the Designation model, handle deletions here
    // Example:
    // await RelatedModel.deleteMany({ designationId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

const Designation = mongoose.model("Designation", designationSchema);

export default Designation;
