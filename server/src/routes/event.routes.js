const express = require("express");
const { hotelEvents } = require("../controllers/event.controller");

const router = express.Router();

router.get("/:hotelId", hotelEvents);

module.exports = router;