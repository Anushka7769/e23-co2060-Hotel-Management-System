const pool = require("../config/db");

async function getAdminDashboard() {
  const [[userStats]] = await pool.query(
    `
    SELECT
      SUM(CASE WHEN role = 'tourist' THEN 1 ELSE 0 END) AS tourists,
      SUM(CASE WHEN role = 'partner' THEN 1 ELSE 0 END) AS partners,
      SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) AS admins,
      COUNT(*) AS total_users
    FROM users
    `
  );

  const [[hotelStats]] = await pool.query(
    `
    SELECT
      COUNT(*) AS total_hotels,
      SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_hotels,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_hotels,
      SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected_hotels
    FROM hotels
    `
  );

  const [[bookingStats]] = await pool.query(
    `
    SELECT
      COUNT(*) AS total_bookings,
      COALESCE(SUM(total_amount), 0) AS total_revenue
    FROM bookings
    `
  );

  const [[complaintStats]] = await pool.query(
    `
    SELECT
      COUNT(*) AS total_complaints,
      SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) AS open_complaints,
      SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS in_progress_complaints,
      SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) AS resolved_complaints
    FROM complaints
    `
  );

  return {
    userStats,
    hotelStats,
    bookingStats,
    complaintStats,
  };
}

async function getAllHotels() {
  const [rows] = await pool.query(
    `
    SELECT
      h.id,
      h.name,
      h.city,
      h.district,
      h.address,
      h.description,
      h.property_type,
      h.status,
      h.is_verified,
      h.created_at,
      u.full_name AS partner_name,
      u.email AS partner_email
    FROM hotels h
    JOIN users u ON h.partner_id = u.id
    ORDER BY h.created_at DESC
    `
  );

  return rows;
}

async function getPendingHotels() {
  const [rows] = await pool.query(
    `
    SELECT
      h.id,
      h.name,
      h.city,
      h.district,
      h.address,
      h.description,
      h.property_type,
      h.status,
      h.is_verified,
      h.created_at,
      u.full_name AS partner_name,
      u.email AS partner_email
    FROM hotels h
    JOIN users u ON h.partner_id = u.id
    WHERE h.status = 'pending'
    ORDER BY h.created_at DESC
    `
  );

  return rows;
}

async function approveHotel(hotelId) {
  const [result] = await pool.query(
    `
    UPDATE hotels
    SET status = 'approved', is_verified = TRUE
    WHERE id = ?
    `,
    [hotelId]
  );

  return result;
}

async function rejectHotel(hotelId) {
  const [result] = await pool.query(
    `
    UPDATE hotels
    SET status = 'rejected', is_verified = FALSE
    WHERE id = ?
    `,
    [hotelId]
  );

  return result;
}

module.exports = {
  getAdminDashboard,
  getAllHotels,
  getPendingHotels,
  approveHotel,
  rejectHotel,
};