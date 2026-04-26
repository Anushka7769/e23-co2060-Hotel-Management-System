const pool = require("../config/db");

async function getRestaurants(hotelId) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      hotel_id,
      name,
      cuisine,
      opening_time,
      closing_time,
      status,
      image_url,
      created_at
    FROM restaurants
    WHERE hotel_id = ?
    ORDER BY id ASC
    `,
    [hotelId]
  );

  return rows;
}

async function getTableReservations(hotelId) {
  const [rows] = await pool.query(
    `
    SELECT
      tr.id,
      tr.restaurant_id,
      r.name AS restaurant_name,
      tr.guest_name,
      tr.reservation_date,
      tr.reservation_time,
      tr.guests,
      tr.status,
      tr.created_at
    FROM table_reservations tr
    JOIN restaurants r ON tr.restaurant_id = r.id
    WHERE r.hotel_id = ?
    ORDER BY tr.reservation_date ASC, tr.reservation_time ASC
    `,
    [hotelId]
  );

  return rows;
}

module.exports = {
  getRestaurants,
  getTableReservations,
};