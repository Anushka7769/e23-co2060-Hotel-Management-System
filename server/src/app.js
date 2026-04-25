const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbTestRoutes = require("./routes/dbTest.routes");
const hotelRoutes = require("./routes/hotel.routes");
const healthRoutes = require("./routes/health.routes");
const roomRoutes = require("./routes/room.routes");
const bookingRoutes = require("./routes/booking.routes");
const partnerRoutes = require("./routes/partner.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to TourismHub LK API",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/db-test", dbTestRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/hotels/:hotelId/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/partner", partnerRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TourismHub LK backend running on port ${PORT}`);
});