const pool = require("../config/db");

async function getRoomsByHotelId(hotelId) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      hotel_id,
      room_type,
      capacity,
      price_per_night,
      total_rooms,
      available_rooms,
      created_at
    FROM rooms
    WHERE hotel_id = ?
    ORDER BY price_per_night ASC
    `,
    [hotelId]
  );

  return rows;
}

async function getRoomById(roomId) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      hotel_id,
      room_type,
      capacity,
      price_per_night,
      total_rooms,
      available_rooms,
      created_at
    FROM rooms
    WHERE id = ?
    `,
    [roomId]
  );

  return rows[0];
}

module.exports = {
  getRoomsByHotelId,
  getRoomById,
};