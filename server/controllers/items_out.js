import Items_out from "../models/Items_out.js";
import ItemsData from "../models/Items.js";

//import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addItem_out = async (req, res) => {
  const { itemName, itemId, quantity, eventId, eventName, date } = req.body;
  try {
    const item = await ItemsData.findOne({ _id: itemId });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    // Create a new donor instance with hashed password
    const newItem_out = new Items_out({
      itemId,
      itemName,
      quantity,
      unit: item.unit,
      eventId,
      eventName,
      date,
    });

    // Save the donor to the database
    await newItem_out.save();

    // Send success response with token
    res.status(200).json({});
  } catch (error) {
    console.error("Error registering item:", error);
    res
      .status(500)
      .json({ error: "Registration failed. Please try again later." });
  }
};

export const getItems_out = async (req, res) => {
  try {
    const items_out = await Items_out.find();
    res.status(200).json(items_out);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItem_out = async (req, res) => {
  try {
    const { id } = req.params;
    const items_out = await Items_out.findById(id);
    res.status(200).json(items_out);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteItems_out = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem_out = await Items_out.findByIdAndDelete(id);
    if (!deletedItem_out) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateItems_out = async (req, res) => {
  try {
    const itemID = req.params.id;
    const updatedItemData_out = req.body; // Updated item data from the request body

    // Find the item by ID in the database and update its information
    const updatedItem_out = await Items_out.findByIdAndUpdate(
      itemID,
      updatedItemData_out,
      { new: true }
    );

    res.json(updatedItem_out); // Send back the updated item object
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
