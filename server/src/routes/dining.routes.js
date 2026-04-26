const express = require("express");
const {
  restaurants,
  tableReservations,
} = require("../controllers/dining.controller");

const router = express.Router();

router.get("/restaurants/:hotelId", restaurants);
router.get("/table-reservations/:hotelId", tableReservations);

module.exports = router;