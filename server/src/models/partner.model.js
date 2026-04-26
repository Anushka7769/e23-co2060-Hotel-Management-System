const pool = require("../config/db");

async function getPartnerDashboard(hotelId) {
  const [[bookingStats]] = await pool.query(
    `
    SELECT
      COUNT(*) AS total_bookings,
      SUM(CASE WHEN booking_status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed_bookings,
      SUM(CASE WHEN payment_status = 'paid' THEN 1 ELSE 0 END) AS paid_bookings,
      COALESCE(SUM(total_amount), 0) AS total_revenue
    FROM bookings
    WHERE hotel_id = ?
    `,
    [hotelId]
  );

  const [[roomStats]] = await pool.query(
    `
    SELECT
      COUNT(*) AS room_types,
      COALESCE(SUM(total_rooms), 0) AS total_rooms,
      COALESCE(SUM(available_rooms), 0) AS available_rooms
    FROM rooms
    WHERE hotel_id = ?
    `,
    [hotelId]
  );

  const [[hotel]] = await pool.query(
    `
    SELECT id, name, city, status, is_verified
    FROM hotels
    WHERE id = ?
    `,
    [hotelId]
  );

  return {
    hotel,
    bookingStats,
    roomStats,
  };
}

async function getPartnerBookings(hotelId) {
  const [rows] = await pool.query(
    `
    SELECT
      b.id,
      b.booking_reference,
      b.check_in,
      b.check_out,
      b.guests,
      b.total_amount,
      b.payment_status,
      b.booking_status,
      u.full_name AS guest_name,
      r.room_type
    FROM bookings b
    JOIN users u ON b.tourist_id = u.id
    JOIN rooms r ON b.room_id = r.id
    WHERE b.hotel_id = ?
    ORDER BY b.created_at DESC
    `,
    [hotelId]
  );

  return rows;
}

async function getPartnerRooms(hotelId) {
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

module.exports = {
  getPartnerDashboard,
  getPartnerBookings,
  getPartnerRooms,
};