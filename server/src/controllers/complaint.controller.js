const { getComplaints } = require("../models/complaint.model");

async function complaints(req, res) {
  try {
    const data = await getComplaints();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch complaints",
      error: error.message,
    });
  }
}

module.exports = {
  complaints,
};