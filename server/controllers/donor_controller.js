import Donors from "../models/Donor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addDonor = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    // Check if the donor already exists
    const existingDonor = await Donors.findOne({ email });

    // If donor exists, send error response
    if (existingDonor) {
      return res.status(400).json({ error: "Donor already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new donor instance with hashed password
    const newDonor = new Donors({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Save the donor to the database
    await newDonor.save();

    // Generate JWT token
    const token = jwt.sign(
      { donorId: newDonor._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Send success response with token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error registering donor:", error);
    res
      .status(500)
      .json({ error: "Registration failed. Please try again later." });
  }
};

export const donorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find donor by email
    const donor = await Donors.findOne({ email });

    // If donor not found or password doesn't match, send error response
    if (!donor || !bcrypt.compareSync(password, donor.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ donorId: donor._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h", // Token expiration time
    });

    res.json({ token });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};

export const getDonors = async (req, res) => {
  try {
    const donors = await Donors.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donors = await Donors.findById(id);
    res.status(200).json(donors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteDonors = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDonor = await Donors.findByIdAndDelete(id);
    if (!deletedDonor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.error("Error deleting donor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateDonors = async (req, res) => {
  try {
    const donorId = req.params.id;
    const updatedDonorData = req.body; // Updated donor data from the request body

    // Find the donor by ID in the database and update its information
    const updatedDonor = await Donors.findByIdAndUpdate(
      donorId,
      updatedDonorData,
      { new: true }
    );

    res.json(updatedDonor); // Send back the updated donor object
  } catch (error) {
    console.error("Error updating donor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
