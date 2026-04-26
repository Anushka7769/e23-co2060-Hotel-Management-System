const express = require("express");
const {
  dashboard,
  bookings,
  rooms,
} = require("../controllers/partner.controller");

const router = express.Router();

router.get("/dashboard/:hotelId", dashboard);
router.get("/bookings/:hotelId", bookings);
router.get("/rooms/:hotelId", rooms);

module.exports = router;