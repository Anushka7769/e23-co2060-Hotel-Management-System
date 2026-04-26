const pool = require("../config/db");

async function getHotelEvents(hotelId) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      hotel_id,
      title,
      event_date,
      event_time,
      description,
      status,
      image_url,
      created_at
    FROM hotel_events
    WHERE hotel_id = ?
    ORDER BY event_date ASC
    `,
    [hotelId]
  );

  return rows;
}

module.exports = {
  getHotelEvents,
};