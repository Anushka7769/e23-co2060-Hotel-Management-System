const express = require("express");
const { complaints } = require("../controllers/complaint.controller");

const router = express.Router();

router.get("/", complaints);

module.exports = router;