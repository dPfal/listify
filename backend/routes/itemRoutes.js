const express = require("express");
const router = express.Router();

const { createItem, updateItem } = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createItem);
router.put("/:id", protect, updateItem);

module.exports = router;
