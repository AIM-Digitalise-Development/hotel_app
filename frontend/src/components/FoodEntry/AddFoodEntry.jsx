import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFoodEntry } from "../../utils/FoodHelper";
import { toast } from "react-toastify";

const AddFoodEntry = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    category: "",
    subcategory: "",
    price: "",
    isAvailable: true,
  });
  const navigate = useNavigate();

  const { foodName, category, subcategory, price, isAvailable } = formData;

  const subcategoryOptions = {
    Indian: ["Complementary Breakfast", "Breakfast", "Lunch", "Dinner", "Snacks", "Refreshments"],
    Chinese: ["Complementary Breakfast", "Breakfast", "Lunch", "Dinner", "Snacks", "Refreshments"],
    Continental: ["Complementary Breakfast", "Breakfast", "Lunch", "Dinner", "Snacks", "Refreshments"],
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Reset subcategory if category changes
    if (id === "category") {
      setFormData((prevData) => ({
        ...prevData,
        subcategory: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!foodName || !category || !subcategory || !price || isNaN(price) || price <= 0) {
      toast.error("All fields are required, and price must be a positive number!");
      return;
    }

    try {
      await addFoodEntry(foodName, category, subcategory, price, isAvailable);
      toast.success("Food entry added successfully!");
      navigate("/admin-dashboard/food-list");
    } catch (error) {
      toast.error("Failed to add food entry. Please try again.");
    }
  };

  return (
    <div className="container mx-auto my-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Add Food Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="foodName" className="block text-sm font-medium text-gray-700">
            Food Name
          </label>
          <input
            type="text"
            id="foodName"
            value={foodName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter food name"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select a category</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Continental">Continental</option>
          </select>
        </div>

        <div>
          <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
            Subcategory
          </label>
          <select
            id="subcategory"
            value={subcategory}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
            disabled={!category} // Disable if no category is selected
          >
            <option value="">Select a subcategory</option>
            {subcategoryOptions[category]?.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter price"
            min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="isAvailable" className="block text-sm font-medium text-gray-700">
            Available
          </label>
          <input
            type="checkbox"
            id="isAvailable"
            checked={isAvailable}
            onChange={(e) =>
              setFormData({
                ...formData,
                isAvailable: e.target.checked,
              })
            }
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Add Food Entry
        </button>
      </form>
    </div>
  );
};

export default AddFoodEntry;
