const express = require("express");
const {
  listHotels,
  getHotelDetails,
} = require("../controllers/hotel.controller");

const router = express.Router();

router.get("/", listHotels);
router.get("/:id", getHotelDetails);

module.exports = router;