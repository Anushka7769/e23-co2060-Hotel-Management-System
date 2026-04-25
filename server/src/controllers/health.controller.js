function checkHealth(req, res) {
  res.status(200).json({
    success: true,
    message: "TourismHub LK backend is running",
  });
}

module.exports = {
  checkHealth,
};