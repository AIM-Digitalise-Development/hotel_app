import "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import AdminNavbar from "../components/dashboard.jsx/AdminNavbar";
import { Outlet } from "react-router-dom";
import Bookings from "../components/dashboardFrontend/Bookings/Bookings";
import BookingsRoomsAndCustomer from "../components/dashboardFrontend/BookingsRoomsAndCustomer/BookingsRoomsAndCustomer";
import CustomerBookRoom from "../components/dashboardFrontend/CustomerBookRoom/CustomerBookRoom";
import Dashboard from "../components/dashboardFrontend/Dashboard/DashBoard";
import AreaChart from "../components/dashboardFrontend/AreaChart/AreaChart";
import Growth from "../components/dashboardFrontend/Growth/Growth";
import Achievements from "../components/dashboardFrontend/Achievements/Achievements";
import Calender1 from "../components/dashboardFrontend/Calendar/Calendar1";
import Calender2 from "../components/dashboardFrontend/Calendar/Calendar2";
import Ios from "../components/dashboardFrontend/Ios/Ios";
import Ocalytics from "../components/dashboardFrontend/Ocalytics/Ocalytics";
import Room from "../components/dashboardFrontend/Rooms/Room";
import ourlogo from "../assets/our-logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
// import image1 from "../assets/pot-1.png";
// import image2 from "../assets/pot-2.png";

// const AdminDashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">

//       <AdminNavbar />

//       <div className="flex flex-grow p-4 overflow-auto gap-8">

//         <div className="flex flex-col gap-4 w-1/6">
//           <img
//             src="/path/to/image1"
//             alt="Image 1"
//             className="h-24 w-full object-cover"
//           />
//           <img
//             src="/path/to/image2"
//             alt="Image 2"
//             className="h-24 w-full object-cover"
//           />
//           <img
//             src="/path/to/image3"
//             alt="Image 3"
//             className="h-24 w-full object-cover"
//           />
//           <img
//             src="/path/to/image4"
//             alt="Image 4"
//             className="h-24 w-full object-cover"
//           />
//         </div>

//         <div className="flex-grow px-4">

//           <div className="grid grid-cols-3 gap-4 mb-4">
//             <div className="w-2/3 h-12">
//               <Bookings />
//             </div>
//             <Dashboard />

//           </div>

//           <div className="grid grid-cols-3 gap-4 mb-4">

//           </div>

//           <div className="grid grid-cols-3 gap-4">
//             <AreaChart />
//             <Achievements />
//             <Ocalytics />
//             <Growth />
//             <CustomerBookRoom />
//           </div>

//           <div className="grid grid-cols-3 gap-4 mt-4">
//             <Calender1 />
//             <Ios />
//             <Calender2 />
//             <Room />
//             <BookingsRoomsAndCustomer />
//           </div>
//         </div>

//         <div className="flex flex-col gap-4 w-1/6">
//           <img
//             src="/path/to/image5"
//             alt="Image 5"
//             className="h-24 w-full object-cover"
//           />
//           <img
//             src="/path/to/image6"
//             alt="Image 6"
//             className="h-24 w-full object-cover"
//           />
//           <img
//             src="/path/to/image7"
//             alt="Image 7"
//             className="h-24 w-full object-cover"
//           />
//           <img
//             src="/path/to/image8"
//             alt="Image 8"
//             className="h-24 w-full object-cover"
//           />
//         </div>
//       </div>

//       <Outlet />
//     </div>
//   );
// };

// export default AdminDashboard;
const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Determine if we are on the base route (dashboard)
  const isDashboardRoute = location.pathname === "/admin-dashboard";
  return (
    <div className="p-10" style={{ padding: "0.5rem" }}>
      {/* Navbar and Logo with Logout button */}
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center w-full max-w-7xl">
            <Link to="/admin-dashboard">
              <img
                src={ourlogo}
                alt="Logo"
                className="h-16 w-40 mr-4 shadow-xl transform transition-transform duration-300 hover:shadow-2xl hover:scale-105"
              />
            </Link>
            <AdminNavbar />
            <div>
              <Link
                to="/admin-dashboard"
                className="text-white font-bold text-md"
              >
                Hello {user.name}
              </Link>
            </div>
          </div>
        </div>

        <div
          className="relative inline-block"
          style={{
            boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.3)",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "6px 6px 8px rgba(0, 0, 0, 0.5)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "4px 4px 6px rgba(0, 0, 0, 0.3)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <LogoutIcon
            onClick={logout}
            className="text-red-500 cursor-pointer text-3xl"
          />
        </div>
      </div>

      {isDashboardRoute ? (
        <div className="flex mt-6 ml-20 ">
          {/* <img
            src={image1}
            alt="Image 1"
            className="h-24 w-24 object-cover shadow-lg"
          /> */}

          <div className="w-[30%] ">
            <Bookings />
          </div>

          <div className="w-[60%] ml-[-20px]">
            <div className="flex items-start ml-[-20px]">
              <div>
                <Dashboard />
              </div>
              <div className="ml-[-10px]">
                <CustomerBookRoom />
              </div>
            </div>
            <div className="flex items-start ">
              <div >
                <BookingsRoomsAndCustomer />
              </div>
              <div className="flex gap-0 mr-6">
                {/* <Growth />
             <Growth /> */}
                <Growth />
              </div>
            </div>
          </div>
          {/* <img
            src={image2}
            alt="Image 2"
            className="h-24 w-24 object-cover shadow-lg"
          /> */}
        </div>
      ) : (
        <div className="w-full mt-6">
          <Outlet />
        </div>
      )}

      {isDashboardRoute && (
        <div className="flex flex-col items-center justify-center w-full mt-6">
          {/* Image section with gap */}
          {/* <div className="flex justify-between items-center w-full gap-6 mb-6"> */}
            {/* <img
              src={image1}
              alt="Image 1"
              className="h-24 w-24 object-cover shadow-lg"
            /> */}
            <div className="flex flex-wrap justify-center gap-4">
              <Room />
              <AreaChart />
              <Achievements />
              <Ocalytics />
            </div>
            {/* <img
              src={image2}
              alt="Image 2"
              className="h-24 w-24 object-cover shadow-lg"
            /> */}
          {/* </div> */}
          <div className="flex flex-col items-center justify-center w-full mt-6">
            {/* <div className="flex justify-between items-center w-full gap-6 mb-6"> */}
              {/* <img
                src={image1}
                alt="Image 1"
                className="h-24 w-24 object-cover shadow-lg"
              /> */}
              <div className="flex flex-wrap justify-center gap-4">
                <Room />
                <Calender2 />
                <Ios />
                <Calender1 />
              </div>
              {/* <img
                src={image2}
                alt="Image 2"
                className="h-24 w-24 object-cover shadow-lg"
              /> */}
            </div>
          </div>
        // </div>
      )}
    </div>
  );
};

export default AdminDashboard;
