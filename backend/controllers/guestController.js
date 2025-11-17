import Guest from "../models/GuestModel.js";



export const addGuest = async (req, res) => {
  try {
    console.log("Received guest details:", req.body);
    const { bookingId, guests } = req.body;
    
    // Check if guests array exists and is non-empty
    if (!Array.isArray(guests) || guests.length === 0) {
      return res.status(400).json({ message: "No guest details provided." });
    }

    // Iterate through each guest and save them individually
    const savedGuests = [];
    for (let guest of guests) {
      const { fullName, phone, email, address, govtIdType, govtIdNumber, country, state, pinCode, roomId } = guest;
      
      // Create a new guest object
      const newGuest = new Guest({
        bookingId,
        fullName,
        phone,
        email,
        address,
        govtIdType,
        govtIdNumber,
        country,
        state,
        pinCode,
        roomId
      });

      // Save the guest to the database
      const savedGuest = await newGuest.save();
      savedGuests.push(savedGuest);
    }

    console.log("Guests saved successfully:", savedGuests);
    res.status(201).json(savedGuests);
  } catch (error) {
    console.error("Error saving guest:", error);
    res.status(500).json({ message: error.message });
  }
};

  
  // Get all guests for a booking
  export const getGuestsByBookingId = async (req, res) => {
    try {
      console.log("Fetching guests for booking ID:", req.params.bookingId);
      const guests = await Guest.find({ bookingId: req.params.bookingId }).populate('roomId');
      console.log("Guests found:", guests);
      res.status(200).json(guests);
    } catch (error) {
      console.error("Error fetching guests:", error);
      res.status(500).json({ message: error.message });
    }
  };