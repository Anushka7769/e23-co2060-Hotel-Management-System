const { getRoomsByHotelId, getRoomById } = require("../models/room.model");

async function listRoomsByHotel(req, res) {
  try {
    const hotelId = req.params.hotelId;
    const rooms = await getRoomsByHotelId(hotelId);

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
}

async function getRoomDetails(req, res) {
  try {
    const room = await getRoomById(req.params.roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch room details",
      error: error.message,
    });
  }
}

module.exports = {
  listRoomsByHotel,
  getRoomDetails,
};