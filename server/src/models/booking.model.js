const pool = require("../config/db");

async function getAllBookings() {
  const [rows] = await pool.query(`
    SELECT
      b.id,
      b.booking_reference,
      b.check_in,
      b.check_out,
      b.guests,
      b.total_amount,
      b.payment_status,
      b.booking_status,
      b.created_at,
      u.full_name AS tourist_name,
      h.name AS hotel_name,
      r.room_type
    FROM bookings b
    JOIN users u ON b.tourist_id = u.id
    JOIN hotels h ON b.hotel_id = h.id
    JOIN rooms r ON b.room_id = r.id
    ORDER BY b.created_at DESC
  `);

  return rows;
}

async function getBookingById(id) {
  const [rows] = await pool.query(
    `
    SELECT
      b.id,
      b.booking_reference,
      b.tourist_id,
      b.hotel_id,
      b.room_id,
      b.check_in,
      b.check_out,
      b.guests,
      b.total_amount,
      b.payment_status,
      b.booking_status,
      b.created_at,
      u.full_name AS tourist_name,
      h.name AS hotel_name,
      r.room_type
    FROM bookings b
    JOIN users u ON b.tourist_id = u.id
    JOIN hotels h ON b.hotel_id = h.id
    JOIN rooms r ON b.room_id = r.id
    WHERE b.id = ?
    `,
    [id]
  );

  return rows[0];
}

async function getBookingsByTouristId(touristId) {
  const [rows] = await pool.query(
    `
    SELECT
      b.id,
      b.booking_reference,
      b.tourist_id,
      b.hotel_id,
      b.room_id,
      b.check_in,
      b.check_out,
      b.guests,
      b.total_amount,
      b.payment_status,
      b.booking_status,
      b.created_at,
      u.full_name AS tourist_name,
      h.name AS hotel_name,
      r.room_type
    FROM bookings b
    JOIN users u ON b.tourist_id = u.id
    JOIN hotels h ON b.hotel_id = h.id
    JOIN rooms r ON b.room_id = r.id
    WHERE b.tourist_id = ?
    ORDER BY b.created_at DESC
    `,
    [touristId]
  );

  return rows;
}

async function createBooking(bookingData) {
  const {
    tourist_id,
    hotel_id,
    room_id,
    check_in,
    check_out,
    guests,
    total_amount,
    payment_status = "pending",
    booking_status = "confirmed",
  } = bookingData;

  const booking_reference = `TH${Date.now()}`;

  const [result] = await pool.query(
    `
    INSERT INTO bookings (
      tourist_id,
      hotel_id,
      room_id,
      check_in,
      check_out,
      guests,
      total_amount,
      payment_status,
      booking_status,
      booking_reference
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      tourist_id,
      hotel_id,
      room_id,
      check_in,
      check_out,
      guests,
      total_amount,
      payment_status,
      booking_status,
      booking_reference,
    ]
  );

  return {
    id: result.insertId,
    booking_reference,
  };
}

module.exports = {
  getAllBookings,
  getBookingById,
  getBookingsByTouristId,
  createBooking,
};