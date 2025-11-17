import "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addHousekeepingServiceEntry } from "../../utils/HousekeepingServiceHelper";
import { toast } from "react-toastify";

const AddHousekeepingService = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await addHousekeepingServiceEntry(data);
      toast.success("Housekeeping Service added successfully!");
      reset();
      navigate("/admin-dashboard/housekeeping-services");
    } catch (error) {
      toast.error("Failed to add Housekeeping Service.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6">Add Housekeeping Service</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Service Name</label>
          <input
            type="text"
            {...register("serviceName", { required: true })}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            {...register("status", { required: true })}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddHousekeepingService;
