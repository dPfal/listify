const express = require("express");
const router = express.Router();

const { createItem } = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createItem);

module.exports = router;
