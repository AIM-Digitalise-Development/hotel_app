import mongoose from 'mongoose';
import Booking from '../models/BookingModel.js';
import RoomEntry from '../models/RoomEntry.js';

// Helper function to calculate the number of days between two dates
const calculateDays = (fromDate, toDate) => {
  const fromTime = new Date(fromDate).getTime();
  const toTime = new Date(toDate).getTime();
  const differenceInTime = toTime - fromTime;
  return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
};

// Helper function to calculate total amount, including GST
const calculateTotalAmount = (rooms, numberOfDays) => {
  return rooms.reduce((total, room) => {
    if (!room.price) {
      throw new Error(`Price for room ID ${room.roomId} is missing`);
    }
    return total + room.price * numberOfDays;
  }, 0);
};

// Helper function to calculate GST and total amount with GST
const calculateGST = (totalAmount) => {
  const gstRate = 0.18; // 18% GST
  const gstAmount = totalAmount * gstRate;
  return {
    gstAmount,
    totalAmountWithGST: totalAmount + gstAmount,
  };
};

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { guestDetails, checkInDate, checkOutDate, selectedRooms } = req.body;
    console.log('Booking details:', req.body);

    // Check if the required data is provided
    if (!guestDetails || !checkInDate || !checkOutDate || !selectedRooms || selectedRooms.length === 0) {
      console.log('Missing required fields:', { guestDetails, checkInDate, checkOutDate, selectedRooms });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate dates
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      console.log('Invalid date range:', { checkInDate, checkOutDate });
      return res.status(400).json({ error: 'Check-out date must be after check-in date' });
    }

    // Check if the rooms are available for the given dates
    const roomIds = selectedRooms.map((room) => room.roomId);
    console.log('Checking overlapping bookings for rooms:', roomIds);
    const overlappingBookings = await Booking.find({
      'rooms.roomId': { $in: roomIds },
      $or: [{ checkInDate: { $lte: checkOutDate }, checkOutDate: { $gte: checkInDate } }],
    });

    if (overlappingBookings.length > 0) {
      console.log('Overlapping bookings found:', overlappingBookings);
      return res.status(400).json({ error: 'One or more rooms are already booked for the selected dates' });
    }

    console.log('Checking room prices and availability');
    const rooms = await RoomEntry.find({ _id: { $in: roomIds } });

    // Validate room prices and status
    for (let i = 0; i < rooms.length; i++) {
      console.log('Room details:', rooms[i]);
      if (rooms[i].status === 'Booked') {
        console.log(`Room ${rooms[i].roomNumber} is already booked`);
        return res.status(400).json({ error: `Room ${rooms[i].roomNumber} is already booked` });
      }
      if (!rooms[i].price) {
        console.log(`Room ${rooms[i].roomNumber} does not have a valid price`);
        return res.status(400).json({ error: `Room ${rooms[i].roomNumber} does not have a valid price per day` });
      }
    }

    console.log('Calculating total amount and GST');
    // Calculate the number of days
    const numberOfDays = calculateDays(checkInDate, checkOutDate);

    const totalAmount = calculateTotalAmount(selectedRooms, numberOfDays);
    console.log('Total amount:', totalAmount);
    const { gstAmount, totalAmountWithGST } = calculateGST(totalAmount);
    console.log('GST Amount:', gstAmount, 'Total with GST:', totalAmountWithGST);

    // Create the booking
    const booking = new Booking({
      bookingId: 'BID' + Date.now().toString(36) + Math.floor(Math.random() * 1000),
      guestDetails: {
        firstName: guestDetails.firstName,
        lastName: guestDetails.lastName,
        phone: guestDetails.phone,
        email: guestDetails.email,
        address: guestDetails.address,
      },
      checkInDate,
      checkOutDate,
      rooms: selectedRooms.map((room) => ({
        roomId: room.roomId,
        price: room.price,
        days: numberOfDays,
        totalAmount: room.price * numberOfDays,
      })),
      status: 'Booked',
      totalAmount,
      gstAmount,
      totalAmountWithGST,
    });
    console.log('Booking to be created:', booking);

    await booking.save();

    // Update room statuses to "Booked"
    await RoomEntry.updateMany(
      { _id: { $in: roomIds } },
      { $set: { status: 'Booked' } }
    );

    return res.status(201).json({ success: true, message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error.message);
    return res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('rooms.roomId', 'roomNumber category price status');
    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('rooms.roomId', 'roomNumber category price status');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    return res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch booking details' });
  }
};

// Export the controller functions
export { createBooking, getAllBookings, getBookingById };
