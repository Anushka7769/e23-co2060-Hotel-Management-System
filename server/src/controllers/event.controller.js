const { getHotelEvents } = require("../models/event.model");

async function hotelEvents(req, res) {
  try {
    const hotelId = req.params.hotelId;
    const data = await getHotelEvents(hotelId);

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hotel events",
      error: error.message,
    });
  }
}

module.exports = {
  hotelEvents,
};