import Items from "../models/Items.js";
//import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addItem = async (req, res) => {
  const { itemID, itemName, quantity, donorId, date } = req.body;
  try {
    // Check if the item already exists
    const existingItem = await Items.findOne({ itemID });

    // If item exists, send error response
    if (existingItem) {
      return res.status(400).json({ error: "Item already exists" });
    }

    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new donor instance with hashed password
    const newItem = new Items({
        itemID,
        itemName,
        quantity,
        donorId,
        date,
    });

    // Save the donor to the database
    await newItem.save();

    // Generate JWT token
    const token = jwt.sign(
      { itemID: newItem._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Send success response with token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error registering item:", error);
    res
      .status(500)
      .json({ error: "Registration failed. Please try again later." });
  }
};

// export const donorLogin = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find donor by email
//     const donor = await Donors.findOne({ email });

//     // If donor not found or password doesn't match, send error response
//     if (!donor || !bcrypt.compareSync(password, donor.password)) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ donorId: donor._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "1h", // Token expiration time
//     });

//     res.json({ token });
//   } catch (error) {
//     console.error("Login failed:", error);
//     res.status(500).json({ message: "Login failed. Please try again later." });
//   }
// };

export const getItems = async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await Items.findById(id);
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteItems = async (req, res) => {
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

export const updateItems = async (req, res) => {
  try {
    const itemID = req.params.id;
    const updatedItemData = req.body; // Updated item data from the request body

    // Find the item by ID in the database and update its information
    const updatedItem = await Items.findByIdAndUpdate(
        itemID,
        updatedItemData,
      { new: true }
    );

    res.json(updatedItem); // Send back the updated item object
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
