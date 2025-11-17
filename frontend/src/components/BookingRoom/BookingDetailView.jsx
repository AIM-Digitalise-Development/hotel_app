import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
  const { id } = useParams(); 
  const [roomDetails, setRoomDetails] = useState(null);
  const [guests, setGuests] = useState([]); 

  useEffect(() => {
    // Fetch room details
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`/api/rooms/${id}`);
        const data = await response.json();
        setRoomDetails(data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    // Fetch guests for the booking ID
    const fetchGuests = async () => {
      try {
        const response = await fetch(`/api/guests/${id}`); 
        const data = await response.json();
        setGuests(data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchRoomDetails();
    fetchGuests();
  }, [id]);

  if (!roomDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Room Details</h2>
      <p><strong>Room Number:</strong> {roomDetails.roomNumber}</p>
      <p><strong>Room Type:</strong> {roomDetails.roomType}</p>
      <p><strong>Number of Persons:</strong> {roomDetails.numberOfPersons}</p>
      <p><strong>Price:</strong> ${roomDetails.price}</p>
      <p><strong>Status:</strong> {roomDetails.status ? 'Available' : 'Not Available'}</p>
      <p><strong>Booking Status:</strong> {roomDetails.bookingStatus ? 'Booked' : 'Not Booked'}</p>

      <h3>Guests</h3>
      {guests.length > 0 ? (
        <ul>
          {guests.map((guest) => (
            <li key={guest._id}>
              <p><strong>Name:</strong> {guest.name}</p>
              <p><strong>Age:</strong> {guest.age}</p>
              <p><strong>Room Assigned:</strong> {guest.roomId?.roomNumber || 'N/A'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No guests found for this booking.</p>
      )}
    </div>
  );
};

export default RoomDetails;
