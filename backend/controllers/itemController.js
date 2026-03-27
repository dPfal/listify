const Item = require("../models/Item");

const createItem = async (req, res) => {
  const { name, quantity, category } = req.body;

  try {
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Item name is required",
      });
    }

    const item = await Item.create({
      name: name.trim(),
      quantity: quantity || 1,
      category: category || "Uncategorized",
      user: req.user.id,
    });

    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create item",
      error: error.message,
    });
  }
};

module.exports = {
  createItem,
};
