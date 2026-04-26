const pool = require("../config/db");

async function createTouristUser(userData) {
  const { full_name, email, phone, password_hash } = userData;

  const [result] = await pool.query(
    `
    INSERT INTO users (full_name, email, phone, password_hash, role)
    VALUES (?, ?, ?, ?, 'tourist')
    `,
    [full_name, email, phone, password_hash]
  );

  return {
    id: result.insertId,
    full_name,
    email,
    phone,
    role: "tourist",
  };
}

async function findUserByEmail(email) {
  const [rows] = await pool.query(
    `
    SELECT id, full_name, email, phone, password_hash, role
    FROM users
    WHERE email = ?
    `,
    [email]
  );

  return rows[0];
}

module.exports = {
  createTouristUser,
  findUserByEmail,
};