// src/components/itemEntry/AddItemEntry.jsx
import "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createItemEntry } from "../../utils/ItemEntryHelper";
import { useNavigate } from "react-router-dom";

const AddItemEntry = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { itemName, category, price, availability, description } = data;

    const itemData = {
      itemName,
      category,
      price,
      availability,
      description,
    };

    try {
      const response = await createItemEntry(itemData);
      if (response.success) {
        toast.success("Item added successfully!");
        navigate("/admin-dashboard/item-entry");
      }
    } catch (error) {
      toast.error("Error adding item!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add Item Entry</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Item Name</label>
          <input
            type="text"
            {...register("itemName", { required: "Item name is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            <option value="Amenities">Amenities</option>
            <option value="Room Service">Room Service</option>
            <option value="Minibar">Minibar</option>
            <option value="Extras">Extras</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Availability</label>
          <select
            {...register("availability", { required: "Availability is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          {errors.availability && <p className="text-red-500 text-sm">{errors.availability.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItemEntry;
