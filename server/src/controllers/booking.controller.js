const {
  getAllBookings,
  getBookingById,
  getBookingByReference,
  getBookingsByTouristId,
  createBooking,
} = require("../models/booking.model");

async function listBookings(req, res) {
  try {
    const bookings = await getAllBookings();

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
}

async function listBookingsByTourist(req, res) {
  try {
    const bookings = await getBookingsByTouristId(req.params.touristId);

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tourist bookings",
      error: error.message,
    });
  }
}

async function getBookingDetails(req, res) {
  try {
    const booking = await getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking details",
      error: error.message,
    });
  }
}

async function getBookingDetailsByReference(req, res) {
  try {
    const booking = await getBookingByReference(req.params.bookingRef);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking by reference",
      error: error.message,
    });
  }
}

async function addBooking(req, res) {
  try {
    const requiredFields = [
      "tourist_id",
      "hotel_id",
      "room_id",
      "check_in",
      "check_out",
      "guests",
      "total_amount",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    const booking = await createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
}

module.exports = {
  listBookings,
  listBookingsByTourist,
  getBookingDetails,
  getBookingDetailsByReference,
  addBooking,
};