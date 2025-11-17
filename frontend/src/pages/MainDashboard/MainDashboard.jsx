import "react";

const MainDashboard = () => {
  const styles = {
    mainContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "20px",
      padding: "20px",
    },
    section: {
      width: "200px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    contentArea: {
      display: "flex",
      flexDirection: "row", // To create 3 parts in the middle
      gap: "20px",
      flex: 1,
    },
    container: {
      border: "1px solid #ddd",
      padding: "10px",
      borderRadius: "8px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      height: "auto", // Default height
    },
    bookingsRoomsContainer: {
      height: "250px", // Increased height for bookings and rooms
    },
    customersAnalyticsContainer: {
        height: "250px", // Increased height for customers and analytics
      },
    image: {
      width: "100px",
      height: "auto",
      borderRadius: "8px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    chartContainer: {
      height: "200px",
      backgroundColor: "#f4f4f4",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px",
    },
    circularContainer: {
      height: "150px",
      width: "150px",
      borderRadius: "50%",
      backgroundColor: "#f4f4f4",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    calendarContainer: {
      height: "200px",
      backgroundColor: "#f4f4f4",
      borderRadius: "8px",
    },
  };

  return (
    <div className="dashboard-container">
      <div style={styles.mainContent}>
        {/* Left Section */}
        <div style={styles.section}>
          <div>
            <img src="/images/potree.png" alt="Pot Tree" style={styles.image} />
          </div>
          <div>
            <img src="/images/potree.png" alt="Pot Tree" style={styles.image} />
          </div>
          <div>
            <img src="/images/potree.png" alt="Pot Tree" style={styles.image} />
          </div>
          <div>
            <img src="/images/potree.png" alt="Pot Tree" style={styles.image} />
          </div>
        </div>

        {/* Main Content Area (Middle Section) */}
        <div style={styles.contentArea}>
          {/* Left Part: Bookings and Rooms (Stacked Vertically) */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ ...styles.container, ...styles.bookingsRoomsContainer }}>

            <div className="text-2xl text-blue-500" >Bookings</div>
              {/* Hotel Room Image */}
              <img
                src="/images/hotel-room.jpg" // Replace with your image path
                alt="Hotel Room"
                style={styles.image}
              />
              {/* Details */}
              <div style={styles.details}>
                <p>Room Type: Deluxe Suite</p>
                <p>Price per Night: $150</p>
                <p>Availability: Available</p>
              </div>
              {/* Buttons */}
              <div>
                <button style={styles.button}>Book Now</button>
                <button style={{ ...styles.button, ...styles.buttonSecondary }}>
                  View Details
                </button>
              </div>
            </div>
        

            {/* Rooms Container */}
            <div style={{ ...styles.container, ...styles.bookingsRoomsContainer }}>
              <h3>Rooms</h3>
              <p>Room details</p>
            </div>
          </div>

          {/* Middle Part: Chart, Circular Container, Calendar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
            <div style={styles.chartContainer}>
              <h4>Bar Graph</h4>
            </div>
            <div style={styles.circularContainer}>
              <h4>Circle</h4>
            </div>
            <div style={styles.calendarContainer}>
              <h4>Calendar</h4>
            </div>
          </div>

           {/* Right Part: Customers Book Room and Analytics (Stacked Vertically) */}
           <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ ...styles.container, ...styles.customersAnalyticsContainer }}>
              <h3>Customers Book Room</h3>
              <p>Customer booking details</p>
            </div>
            <div style={{ ...styles.container, ...styles.customersAnalyticsContainer }}>
              <h3>Analytics</h3>
              <p>Analytics content here</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div style={styles.section}>
          <div>
            <img src="/images/potree.png" alt="Pot Tree" style={styles.image} />
          </div>
          <div>
            <img src="/images/potree.png" alt="Pot Tree" style={styles.image} />
          </div>
          <div>
            <img src="/images/potree.png" alt="Pot Tree" style={styles.image} />
          </div>
          <div>
            <img src="/images/potree.png" alt="Pot Tree" style={styles.image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
