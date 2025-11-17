import { useState } from "react";
import { BarChart, Calendar, Users, Home, TrendingUp, Clock } from "lucide-react";
import "./MainDashboard.css";

const MainDashboard = () => {
  const [stats] = useState({
    bookings: 127,
    rooms: 45,
    customers: 892,
    occupancy: "78%",
    revenue: "$45,892",
    avgStay: "3.2 days"
  });

  const rooms = [
    {
      id: 1,
      name: "Deluxe Suite",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
      status: "Occupied"
    },
    {
      id: 2,
      name: "Executive Room",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      status: "Available"
    },
    {
      id: 3,
      name: "Premium Suite",
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
      status: "Reserved"
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="stats-card">
        <div className="stat-item">
          <BarChart className="text-blue-500 mb-2" />
          <div className="stat-value">{stats.bookings}</div>
          <div className="stat-label">Total Bookings</div>
        </div>
        <div className="stat-item">
          <Home className="text-blue-500 mb-2" />
          <div className="stat-value">{stats.rooms}</div>
          <div className="stat-label">Available Rooms</div>
        </div>
        <div className="stat-item">
          <Users className="text-blue-500 mb-2" />
          <div className="stat-value">{stats.customers}</div>
          <div className="stat-label">Total Customers</div>
        </div>
        <div className="stat-item">
          <TrendingUp className="text-blue-500 mb-2" />
          <div className="stat-value">{stats.occupancy}</div>
          <div className="stat-label">Occupancy Rate</div>
        </div>
        <div className="stat-item">
          <Calendar className="text-blue-500 mb-2" />
          <div className="stat-value">{stats.revenue}</div>
          <div className="stat-label">Monthly Revenue</div>
        </div>
        <div className="stat-item">
          <Clock className="text-blue-500 mb-2" />
          <div className="stat-value">{stats.avgStay}</div>
          <div className="stat-label">Average Stay</div>
        </div>
      </div>

      <div className="main-content">
        <div className="side-section">
          <div className="card">
            <h3 className="section-title">Quick Actions</h3>
            {/* Add your existing side content here */}
          </div>
        </div>

        <div className="content-area">
          <div className="card chart-container">
            <h3 className="section-title">Booking Analytics</h3>
            {/* Add your chart component here */}
          </div>

          <div className="card">
            <h3 className="section-title">Available Rooms</h3>
            <div className="room-grid">
              {rooms.map((room) => (
                <div key={room.id} className="room-card">
                  <img src={room.image} alt={room.name} className="room-image" />
                  <div className="room-info">
                    <h4 className="font-semibold">{room.name}</h4>
                    <p className={`text-sm ${
                      room.status === 'Available' ? 'text-green-500' : 
                      room.status === 'Occupied' ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                      {room.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="calendar-section">
            <h3 className="section-title">Booking Calendar</h3>
            {/* Add your calendar component here */}
          </div>
        </div>

        <div className="side-section">
          <div className="card">
            <h3 className="section-title">Recent Activities</h3>
            {/* Add your existing side content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;