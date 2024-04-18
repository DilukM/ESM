import dEvent from "../models/DonationEvents.js";
import jwt from "jsonwebtoken";

export const addDEvent = async (req, res) => {
  const { eventDetails } = req.body;
  const id = eventDetails.id;
  const name = eventDetails.eventName;
  // const cover = eventDetails.coverImage;
  const date = eventDetails.date;
  const location = eventDetails.location;
  try {
    // Check if the donor already exists
    const existingEventId = await dEvent.findOne({ id });

    // If donor exists, send error response
    if (existingEventId) {
      return res.status(400).json({ error: "Event ID already exists" });
    }

    // Create a new donor instance with hashed password
    const newDEvent = new dEvent({
      id,
      name,
      // cover,
      date,
      location,
    });

    // Save the donor to the database
    await newDEvent.save();

    // Generate JWT token
    const token = jwt.sign({ id: newDEvent._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send success response with token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error registering donation Event:", error);
    res
      .status(500)
      .json({ error: "Registration failed. Please try again later." });
  }
};

export const getdEvents = async (req, res) => {
  try {
    const dEvent = await dEvent.find();
    res.status(200).json(dEvent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getdEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const dEvent = await dEvent.findById(id);
    res.status(200).json(dEvent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletedEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDonor = await dEvent.findByIdAndDelete(id);
    if (!deletedDonor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.error("Error deleting donor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatedEvent = async (req, res) => {
  try {
    const donorId = req.params.id;
    const updatedDonorData = req.body; // Updated donor data from the request body

    // Find the donor by ID in the database and update its information
    const updatedDonor = await dEvent.findByIdAndUpdate(
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
