const express = require("express");
const {
  dashboard,
  hotels,
  pendingHotels,
  approve,
  reject,
} = require("../controllers/admin.controller");

const router = express.Router();

router.get("/dashboard", dashboard);
router.get("/hotels", hotels);
router.get("/hotels/pending", pendingHotels);
router.patch("/hotels/:id/approve", approve);
router.patch("/hotels/:id/reject", reject);

module.exports = router;