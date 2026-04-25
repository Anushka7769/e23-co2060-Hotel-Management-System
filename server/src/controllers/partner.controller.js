const {
  getPartnerDashboard,
  getPartnerBookings,
  getPartnerRooms,
} = require("../models/partner.model");

async function dashboard(req, res) {
  try {
    const hotelId = req.params.hotelId;
    const data = await getPartnerDashboard(hotelId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch partner dashboard",
      error: error.message,
    });
  }
}

async function bookings(req, res) {
  try {
    const hotelId = req.params.hotelId;
    const data = await getPartnerBookings(hotelId);

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch partner bookings",
      error: error.message,
    });
  }
}

async function rooms(req, res) {
  try {
    const hotelId = req.params.hotelId;
    const data = await getPartnerRooms(hotelId);

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch partner rooms",
      error: error.message,
    });
  }
}

module.exports = {
  dashboard,
  bookings,
  rooms,
};