import Items_out from "../models/Items_out.js";

//import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addItem_out = async (req, res) => {
  const { itemID, quantity, eventId, date } = req.body;
  try {
    // Check if the item already exists
    const existingItem_out = await Items_out.findOne({ itemID });

    // If item exists, send error response
    if (existingItem_out) {
      return res.status(400).json({ error: "Item already exists" });
    }

    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new donor instance with hashed password
    const newItem_out = new Items_out({
      itemID,

      quantity,
      eventId,
      date,
    });

    // Save the donor to the database
    await newItem_out.save();

    // Generate JWT token
    const token = jwt.sign(
      { itemID: newItem_out._id },
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

export const getItems_out = async (req, res) => {
  try {
    const Items_out = await Items_out.find();
    res.status(200).json(Items_out);
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
