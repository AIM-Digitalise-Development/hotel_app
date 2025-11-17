import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import DesignationList from './components/designation/DesignationList';
import AddDesignation from './components/designation/AddDesignation';
import EmployeeList from './components/employee/List';
import AddEmployee from './components/employee/Add';
import ViewEmployee from './components/employee/View';
import EditEmployee from './components/employee/Edit';
import AddSalary from './components/salary/Add';
import ViewSalary from './components/salary/View';
import EmployeeSummary from './components/EmployeeDashboard/Summary';
import LeaveList from './components/leave/List';
import AddLeave from './components/leave/Add';
import Setting from './components/EmployeeDashboard/Setting';
import LeaveDetail from './components/leave/Detail';
import RoomCategoryAdd from './components/RoomCategory/RoomCategoryAdd';
import RoomCategoryList from './components/RoomCategory/RoomCategoryList';
import RoomEntryAdd from './components/RoomEntry/RoomEntryAdd';
import RoomEntryList from './components/RoomEntry/RoomEntryList';
import FoodList from './components/FoodEntry/ListFoodEntry';
import FoodAdd from './components/FoodEntry/AddFoodEntry';
import ListLaundryService from './components/laundryService/ListLaundryService';
import AddLaundryService from './components/laundryService/AddLaundryService';
import ListItemEntry from './components/ItemEntry/ListItemEntry';
import AddItemEntry from './components/ItemEntry/AddItemEntry';
import ListCarEntries from './components/CarEntry/ListCarEntries';
import AddCarEntry from './components/CarEntry/AddCarEntry';
import ListHousekeepingServices from './components/HouseKeeping/ListHousekeepingServices';
import AddHousekeepingService from './components/HouseKeeping/AddHousekeepingService';
import BookRoom from './components/BookingRoom/BookRoom';
import RoomBookingList from './components/BookingRoom/RoomBookingList';
import CustomerList from './components/BookingRoom/CustomerList';
import AddCustomer from './components/BookingRoom/AddCustomer';
import AccessRole from './components/accessRole';
import BookingsListDetails from './components/BookingRoom/BookingsDetailsList';
import HomePage from './pages/HomePage';
import BookingPage  from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import BookingFormPage from './components/BookingRoom/BookingFormPage';
import BookingDetailView from './components/BookingRoom/BookingDetailView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="designations" element={<DesignationList />} />
          <Route path="designations/add" element={<AddDesignation />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="employees/:id" element={<ViewEmployee />} />
          <Route path="employees/edit/:id" element={<EditEmployee />} />
          <Route path="employees/salary/:id" element={<ViewSalary />} />
          <Route path="salary/add" element={<AddSalary />} />
          <Route path="leaves" element={<LeaveList />} />
          <Route path="leaves/:id" element={<LeaveDetail />} />
          <Route path="employees/leaves/:id" element={<LeaveList />} />
          <Route path="setting" element={<Setting />} />
          
            {/* New Room Routes */}
            <Route path="room-category" element={<RoomCategoryList />} />
          <Route path="room-category/add" element={<RoomCategoryAdd />} />
           <Route path="room-entries" element={<RoomEntryList />} />
          <Route path="add-room-entry" element={<RoomEntryAdd />} />
          <Route path="food-list" element={<FoodList />} /> {/* Food List */}
          <Route path="add-food" element={<FoodAdd />} /> {/* Add Food */}
          <Route path="laundry-service" element={<ListLaundryService />} /> {/* Food List */}
          <Route path="laundry-service/add" element={<AddLaundryService />} /> {/* Add Food */}
          <Route path="/admin-dashboard/item-entry" element={<ListItemEntry />} />
          <Route path="/admin-dashboard/item-entry/add" element={<AddItemEntry />} />
          <Route path="/admin-dashboard/car-entries" element={<ListCarEntries />} />
          <Route path="/admin-dashboard/add-car-entry" element={<AddCarEntry />} />
          <Route path="/admin-dashboard/housekeeping" element={<ListHousekeepingServices />} />
          <Route path="/admin-dashboard/add-housekeeping-service" element={<AddHousekeepingService />} />

            {/* Add Route for Room Booking and Room Booking List */}
            <Route path="book-room" element={<BookRoom />} />  {/* Book Room Form */}
            <Route path="book-room/:roomId" element={<BookRoom />} />
          <Route path="room-bookings" element={<RoomBookingList />} />  {/* Room Booking List */}
          <Route path="/admin-dashboard/customers" element={<CustomerList />} />
          <Route path="/admin-dashboard/customers/add" element={<AddCustomer />} />
          <Route path="/admin-dashboard/accessRole" element={<AccessRole />} />
          <Route path="/admin-dashboard/bookings-list" element={<BookingsListDetails />} />
           <Route path="/admin-dashboard/booking/:id" element={<BookingFormPage />} />
          <Route path="/admin-dashboard/homepage" element={<HomePage />} />
          <Route path="/admin-dashboard/booking" element={<BookingPage />} />
          <Route path="/admin-dashboard/confirmation" element={<ConfirmationPage/>} />
          <Route path="/admin-dashboard/booking/view/:bookingId" element={<BookingDetailView />} />
        </Route>
       

        {/* Employee Dashboard */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<EmployeeSummary />} />
          <Route path="profile/:id" element={<ViewEmployee />} />
          <Route path="leaves/:id" element={<LeaveList />} />
          <Route path="add-leave" element={<AddLeave />} />
          <Route path="salary/:id" element={<ViewSalary />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
