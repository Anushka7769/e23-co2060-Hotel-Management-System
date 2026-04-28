const express = require("express");
const {
  registerTourist,
  loginUser,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerTourist);
router.post("/login", loginUser);

module.exports = router;