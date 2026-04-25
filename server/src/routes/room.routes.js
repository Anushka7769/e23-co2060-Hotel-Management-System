const express = require("express");
const {
  listRoomsByHotel,
  getRoomDetails,
} = require("../controllers/room.controller");

const router = express.Router({ mergeParams: true });

router.get("/", listRoomsByHotel);
router.get("/:roomId", getRoomDetails);

module.exports = router;