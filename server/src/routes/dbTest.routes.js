const express = require("express");
const { testDatabase } = require("../controllers/dbTest.controller");

const router = express.Router();

router.get("/", testDatabase);

module.exports = router;