const pool = require("../config/db");

async function getAllHotels() {
  const [rows] = await pool.query(`
    SELECT
      id,
      name,
      city,
      district,
      address,
      description,
      property_type,
      status,
      is_verified,
      created_at
    FROM hotels
    ORDER BY created_at DESC
  `);

  return rows;
}

async function getHotelById(id) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      name,
      city,
      district,
      address,
      description,
      property_type,
      status,
      is_verified,
      created_at
    FROM hotels
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];
}

module.exports = {
  getAllHotels,
  getHotelById,
};