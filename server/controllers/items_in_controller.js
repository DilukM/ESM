import Items from "../models/Items_In.js";
import Donors from "../models/Donor.js"; // Import the Donor model
import ItemsData from "../models/Items.js"; // Import the Item model

export const addItem_in = async (req, res) => {
  const { itemName, itemId, quantity, donorId, donorName, date } = req.body;
  try {
    const item = await ItemsData.findOne({ _id: itemId });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Create a new donor instance with hashed password
    const newItem = new Items({
      itemId,
      itemName,
      quantity,
      unit: item.unit,
      donorId,
      donorName,
      date,
    });

    // Save the item to the database
    await newItem.save();
    await updateDonorScores();
    await updateDonorRanks();

    // Send success response with token
    res.status(200).json({ message: "Item added and donor score updated" });
  } catch (error) {
    console.error("Error listing item:", error);
    res.status(500).json({
      error: "Item registration failed. Please try again later.",
      error,
    });
  }
};

const updateDonorRanks = async () => {
  try {
    // Get all donors sorted by score in descending order
    const donors = await Donors.find().sort({ score: -1 });

    // Update rank based on position in the sorted list
    for (let i = 0; i < donors.length; i++) {
      await Donors.findByIdAndUpdate(donors[i]._id, { rank: i + 1 });
    }
  } catch (error) {
    console.error("Error updating donor ranks:", error);
  }
};

async function updateDonorScores() {
  try {
    // Get all donors
    const donors = await Donors.find();

    // Iterate over each donor to calculate their score
    for (const donor of donors) {
      // Get all ItemsIn records for this donor
      const itemsIn = await Items.find({ donorId: donor._id });

      let totalScore = 0;

      // Calculate total score for this donor
      for (const itemIn of itemsIn) {
        const item = await ItemsData.findById(itemIn.itemId);
        totalScore += itemIn.quantity * item.unitScore;
      }

      // Update donor's score
      await Donors.findByIdAndUpdate(donor._id, { score: totalScore });
    }
  } catch (error) {
    console.error("Error updating donor scores:", error);
  }
}

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
    await updateDonorScores();
    await updateDonorRanks();
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

    await updateDonorScores();
    await updateDonorRanks();

    res.json(updatedItem); // Send back the updated item object
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
