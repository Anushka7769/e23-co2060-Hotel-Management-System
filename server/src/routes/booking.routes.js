const express = require("express");
const {
  listBookings,
  listBookingsByTourist,
  getBookingDetails,
  getBookingDetailsByReference,
  addBooking,
} = require("../controllers/booking.controller");

const router = express.Router();

router.get("/", listBookings);
router.get("/user/:touristId", listBookingsByTourist);
router.get("/reference/:bookingRef", getBookingDetailsByReference);
router.get("/:id", getBookingDetails);
router.post("/", addBooking);

module.exports = router;