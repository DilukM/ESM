import Items from "../models/Items_In.js";

export const addItem_in = async (req, res) => {
  const { itemName, itemId, quantity, donorId, donorName, date } = req.body;
  try {
    // Create a new donor instance with hashed password
    const newItem = new Items({
      itemId,
      itemName,
      quantity,
      donorId,
      donorName,
      date,
    });

    // Save the item to the database
    await newItem.save();

    // Send success response with token
    res.status(200).json({});
  } catch (error) {
    console.error("Error listing item:", error);
    res.status(500).json({
      error: "Item registration failed. Please try again later.",
      error,
    });
  }
};

export const getItems_in = async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItem_in = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await Items.findById(id);
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteItems_in = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Items.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateItems_in = async (req, res) => {
  try {
    const itemID = req.params.id;
    const updatedItemData = req.body; // Updated item data from the request body

    // Find the item by ID in the database and update its information
    const updatedItem = await Items.findByIdAndUpdate(itemID, updatedItemData, {
      new: true,
    });

    res.json(updatedItem); // Send back the updated item object
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
