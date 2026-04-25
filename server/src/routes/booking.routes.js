const express = require("express");
const {
  listBookings,
  getBookingDetails,
  addBooking,
} = require("../controllers/booking.controller");

const router = express.Router();

router.get("/", listBookings);
router.get("/:id", getBookingDetails);
router.post("/", addBooking);

module.exports = router;