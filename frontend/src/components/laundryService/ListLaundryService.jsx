import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLaundryServiceEntries } from "../../utils/LaundryServiceHelper";
import { toast } from "react-toastify";

const ListLaundryService = () => {
  const [laundryServices, setLaundryServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLaundryServices = async () => {
      setLoading(true);
      try {
        const response = await getLaundryServiceEntries(currentPage, searchQuery);
        if (response.success) {
          setLaundryServices(response.data);
          setTotalPages(Math.ceil(response.totalEntries / 10)); // Assuming 10 items per page
        } else {
          toast.error("Failed to fetch laundry services.");
        }
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaundryServices();
  }, [currentPage, searchQuery]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Laundry Services</h2>
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/admin-dashboard/laundry-service/add"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Laundry Service Entry
        </Link>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Service Name"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {laundryServices.map((service) => (
            <div key={service._id} className="border p-4 rounded-md">
              <h3 className="text-xl font-semibold">{service.serviceName}</h3>
              <p>{service.description}</p>
              <p className="font-medium">Price: ${service.price}</p>
              <p className="text-sm text-gray-500">Status: {service.status}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListLaundryService;
