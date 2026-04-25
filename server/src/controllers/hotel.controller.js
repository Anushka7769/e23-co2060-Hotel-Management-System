const { getAllHotels, getHotelById } = require("../models/hotel.model");

async function listHotels(req, res) {
  try {
    const hotels = await getAllHotels();

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hotels",
      error: error.message,
    });
  }
}

async function getHotelDetails(req, res) {
  try {
    const hotel = await getHotelById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hotel details",
      error: error.message,
    });
  }
}

module.exports = {
  listHotels,
  getHotelDetails,
};