import 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../styles/Room.css';

const RoomForm = ({ selectedRoom, onSave }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: selectedRoom || {
      roomNumber: '',
      roomType: '',
      numPersons: '',
      price: '',
      roomStatus: 'Available',
      bookingStatus: 'Not Booked',
    },
  });

  const onSubmit = async (data) => {
    try {
      if (selectedRoom) {
        await axios.put(`/api/rooms/${selectedRoom._id}`, data);
      } else {
        await axios.post('/api/rooms/add', data);
      }
      onSave();
      reset();
    } catch (error) {
      console.error(error.response?.data?.error || 'Error saving room');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="room-form-container">
      <h2>{selectedRoom ? 'Update Room' : 'Add Room'}</h2>
      <div className="room-form-group">
        <label htmlFor="roomNumber">Room Number</label>
        <input {...register('roomNumber')} id="roomNumber" placeholder="Room Number" required />
      </div>
      <div className="room-form-group">
        <label htmlFor="roomType">Room Type</label>
        <input {...register('roomType')} id="roomType" placeholder="Room Type" required />
      </div>
      <div className="room-form-group">
        <label htmlFor="numPersons">No. of Persons</label>
        <input {...register('numPersons')} id="numPersons" type="number" placeholder="No. of Persons" required />
      </div>
      <div className="room-form-group">
        <label htmlFor="price">Price</label>
        <input {...register('price')} id="price" type="number" placeholder="Price" required />
      </div>
      <div className="room-form-group">
        <label htmlFor="roomStatus">Room Status</label>
        <select {...register('roomStatus')} id="roomStatus">
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>
      <div className="room-form-group">
        <label htmlFor="bookingStatus">Booking Status</label>
        <select {...register('bookingStatus')} id="bookingStatus">
          <option value="Not Booked">Not Booked</option>
          <option value="Booked">Booked</option>
        </select>
      </div>
      <button type="submit" className="room-form-button">{selectedRoom ? 'Update Room' : 'Add Room'}</button>
    </form>
  );
};

RoomForm.propTypes = {
  selectedRoom: PropTypes.shape({
    _id: PropTypes.string,
    roomNumber: PropTypes.string,
    roomType: PropTypes.string,
    numPersons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    roomStatus: PropTypes.string,
    bookingStatus: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default RoomForm;
