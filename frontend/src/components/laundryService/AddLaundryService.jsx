import  { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addLaundryServiceEntry } from "../../utils/LaundryServiceHelper";

const AddLaundryService = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await addLaundryServiceEntry(data);
      if (response.success) {
        toast.success("Laundry service entry added successfully!");
        navigate("/admin-dashboard/laundry-service"); // Navigate to list page
      } else {
        toast.error("Failed to add laundry service entry.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Laundry Service</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="serviceName" className="block text-sm font-medium">Service Name</label>
          <input
            id="serviceName"
            type="text"
            {...register("serviceName", { required: "Service Name is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.serviceName && <span className="text-red-500 text-xs">{errors.serviceName.message}</span>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            {...register("description")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium">Price</label>
          <input
            id="price"
            type="number"
            {...register("price", { required: "Price is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium">Status</label>
          <select
            id="status"
            {...register("status", { required: "Status is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          {errors.status && <span className="text-red-500 text-xs">{errors.status.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Laundry Service"}
        </button>
      </form>
    </div>
  );
};

export default AddLaundryService;
