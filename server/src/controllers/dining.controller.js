const {
  getRestaurants,
  getTableReservations,
} = require("../models/dining.model");

async function restaurants(req, res) {
  try {
    const hotelId = req.params.hotelId;
    const data = await getRestaurants(hotelId);

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurants",
      error: error.message,
    });
  }
}

async function tableReservations(req, res) {
  try {
    const hotelId = req.params.hotelId;
    const data = await getTableReservations(hotelId);

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch table reservations",
      error: error.message,
    });
  }
}

module.exports = {
  restaurants,
  tableReservations,
};