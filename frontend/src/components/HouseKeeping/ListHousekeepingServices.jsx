import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHousekeepingServiceEntries } from "../../utils/HousekeepingServiceHelper";
import { toast } from "react-toastify";

const ListHousekeepingServices = () => {
  const [housekeepingServices, setHousekeepingServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getHousekeepingServiceEntries();
        setHousekeepingServices(data.data);
      } catch (error) {
        toast.error("Failed to fetch Housekeeping Services.");
      }
    };
    fetchServices();
  }, []);

  const filteredServices = housekeepingServices.filter((service) =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Housekeeping Services</h2>
        <button
          onClick={() => navigate("/admin-dashboard/add-housekeeping-service")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Housekeeping Service Entry
        </button>
      </div>
      <input
        type="text"
        placeholder="Search services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 w-full border rounded shadow-sm"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Service Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service._id}>
              <td className="border border-gray-300 px-4 py-2">{service.serviceName}</td>
              <td className="border border-gray-300 px-4 py-2">{service.description}</td>
              <td className="border border-gray-300 px-4 py-2">${service.price}</td>
              <td className="border border-gray-300 px-4 py-2">{service.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListHousekeepingServices;
