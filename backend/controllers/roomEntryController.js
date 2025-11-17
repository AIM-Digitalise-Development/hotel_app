import RoomEntry from '../models/RoomEntry.js';
import RoomCategory from '../models/RoomCategory.js';
import cloudinary from '../config/cloudinary.js';

// Helper: Upload single image buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'hms/rooms',
          transformation: [
            { width: 1000, height: 800, crop: 'limit' },
            { quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      )
      .end(buffer);
  });
};

// Add Room Entry
export const addRoomEntry = async (req, res) => {
  const { roomNumber, floorNumber, bedSize, category, price } = req.body;

  try {
    // Validate category
    const roomCategory = await RoomCategory.findById(category);
    if (!roomCategory) {
      return res.status(400).json({ message: 'Room category not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one image' });
    }

    // Upload all images to Cloudinary
    const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
    const uploadedResults = await Promise.all(uploadPromises);

    const imageUrls = uploadedResults.map((img) => img.url);
    const imagePublicIds = uploadedResults.map((img) => img.public_id);

    // Create new room entry
    const roomEntry = new RoomEntry({
      roomNumber,
      floorNumber,
      bedSize,
      category,
      images: imageUrls,
      imagePublicIds, // Store public_ids to delete later if needed
      price,
      status: 'Available',
    });

    await roomEntry.save();

    res.status(201).json({
      message: 'Room entry created successfully',
      roomEntry,
    });
  } catch (error) {
    console.error('Error adding room entry:', error);
    res.status(500).json({
      message: 'Error adding room entry',
      error: error.message,
    });
  }
};

// Get All Room Entries
export const getRoomEntries = async (req, res) => {
  try {
    const rooms = await RoomEntry.find().populate('category', 'name description');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room entries', error: error.message });
  }
};

// Get Available Rooms (Fixed Logic - Now uses Booking model properly)
export const getRoomEntry = async (req, res) => {
  const { checkInDate, checkOutDate } = req.query;

  if (!checkInDate || !checkOutDate) {
    return res.status(400).json({ message: 'checkInDate and checkOutDate are required' });
  }

  try {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (isNaN(checkIn) || isNaN(checkOut)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Find bookings that overlap with the requested dates
    const overlappingBookings = await Booking.find({
      $or: [
        { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } }
      ],
      status: { $nin: ['Cancelled', 'CheckedOut'] }
    }).select('room');

    const bookedRoomIds = overlappingBookings.map(b => b.room.toString());

    // Find rooms that are NOT booked
    const availableRooms = await RoomEntry.find({
      _id: { $nin: bookedRoomIds }
    }).populate('category', 'name');

    if (availableRooms.length === 0) {
      return res.status(404).json({ message: 'No rooms available for selected dates' });
    }

    res.status(200).json(availableRooms);
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    res.status(500).json({ message: 'Failed to fetch available rooms' });
  }
};

// Get Room by ID
export const getRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await RoomEntry.findById(id).populate('category', 'name description');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room details', error: error.message });
  }
};

// Update Room Entry (Supports replacing images)
export const updateRoomEntry = async (req, res) => {
  const { id } = req.params;
  const { roomNumber, floorNumber, bedSize, category, price } = req.body;

  try {
    const roomEntry = await RoomEntry.findById(id);
    if (!roomEntry) {
      return res.status(404).json({ message: 'Room entry not found' });
    }

    // If new images are uploaded, delete old ones from Cloudinary
    if (req.files && req.files.length > 0) {
      if (roomEntry.imagePublicIds && roomEntry.imagePublicIds.length > 0) {
        await Promise.all(
          roomEntry.imagePublicIds.map((publicId) =>
            cloudinary.uploader.destroy(publicId).catch(() => console.log(`Failed to delete ${publicId}`))
          )
        );
      }

      const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      const uploadedResults = await Promise.all(uploadPromises);

      roomEntry.images = uploadedResults.map((img) => img.url);
      roomEntry.imagePublicIds = uploadedResults.map((img) => img.public_id);
    }

    // Update other fields if provided
    roomEntry.roomNumber = roomNumber || roomEntry.roomNumber;
    roomEntry.floorNumber = floorNumber || roomEntry.floorNumber;
    roomEntry.bedSize = bedSize || roomEntry.bedSize;
    roomEntry.category = category || roomEntry.category;
    roomEntry.price = price || roomEntry.price;

    await roomEntry.save();

    res.status(200).json({
      message: 'Room entry updated successfully',
      roomEntry,
    });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Error updating room entry', error: error.message });
  }
};

// Delete Room Entry (Also deletes images from Cloudinary)
export const deleteRoomEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const roomEntry = await RoomEntry.findById(id);
    if (!roomEntry) {
      return res.status(404).json({ message: 'Room entry not found' });
    }

    // Delete images from Cloudinary
    if (roomEntry.imagePublicIds && roomEntry.imagePublicIds.length > 0) {
      await Promise.all(
        roomEntry.imagePublicIds.map((publicId) =>
          cloudinary.uploader.destroy(publicId).catch(() => console.log(`Cleanup failed for ${publicId}`))
        )
      );
    }

    await RoomEntry.findByIdAndDelete(id);

    res.status(200).json({ message: 'Room entry and images deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Error deleting room entry', error: error.message });
  }
};