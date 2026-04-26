const pool = require("../config/db");

async function getComplaints() {
  const [rows] = await pool.query(
    `
    SELECT
      c.id,
      c.subject,
      c.description,
      c.complaint_type,
      c.priority,
      c.status,
      c.created_at,
      u.full_name AS submitted_by,
      h.name AS hotel_name
    FROM complaints c
    JOIN users u ON c.user_id = u.id
    LEFT JOIN hotels h ON c.hotel_id = h.id
    ORDER BY c.created_at DESC
    `
  );

  return rows;
}

module.exports = {
  getComplaints,
};