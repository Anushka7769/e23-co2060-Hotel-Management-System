const {
  getAdminDashboard,
  getAllHotels,
  getPendingHotels,
  approveHotel,
  rejectHotel,
} = require("../models/admin.model");

async function dashboard(req, res) {
  try {
    const data = await getAdminDashboard();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin dashboard",
      error: error.message,
    });
  }
}

async function hotels(req, res) {
  try {
    const data = await getAllHotels();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hotels",
      error: error.message,
    });
  }
}

async function pendingHotels(req, res) {
  try {
    const data = await getPendingHotels();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending hotels",
      error: error.message,
    });
  }
}

async function approve(req, res) {
  try {
    const hotelId = req.params.id;
    await approveHotel(hotelId);

    res.status(200).json({
      success: true,
      message: "Hotel approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to approve hotel",
      error: error.message,
    });
  }
}

async function reject(req, res) {
  try {
    const hotelId = req.params.id;
    await rejectHotel(hotelId);

    res.status(200).json({
      success: true,
      message: "Hotel rejected successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reject hotel",
      error: error.message,
    });
  }
}

module.exports = {
  dashboard,
  hotels,
  pendingHotels,
  approve,
  reject,
};