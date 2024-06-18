import jwt from "jsonwebtoken";
import treeEvent from "../models/TreePlantationEvent.js";




export const addSponsor = async (req, res) => {
  const {
    coverImage,
    eventID,
    eventName,
    eventDate,
    province,
    district,
    city,
    comments,
    
  } = req.body;
  console.log("controller running");
  try {
    // Check if the donor already exists
    const existingEventId = await treeEvent.findOne({ eventID });
    console.log(existingEventId);

    // If donor exists, send error response
    if (existingEventId) {
      return res.status(400).json({ error: "Event ID already exists" });
    }

    // Create a new donor instance with hashed password
    const newtreeEvent = new treeEvent({
      coverImage,
      eventID,
      eventName,
      eventDate,
      province,
      district,
      city,
      comments,
      
    });

    // Save the donor to the database
    await newtreeEvent.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newtreeEvent._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Send success response with token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error registering Tree Event:", error);
    res
      .status(500)
      .json({ error: "Registration now failed. Please try again later." });
  }
};

export const getTreeEvents = async (req, res) => {
  try {
    const treeEvents = await treeEvent.find();
    res.status(200).json(treeEvents);
    console.log("success");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTreeEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const treeEvent = await treeEvent.findById(eventID);
    res.status(200).json(treeEvent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTreeEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDonor = await treeEvent.findByIdAndDelete(id);
    if (!deletedDonor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting Event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTreeEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEventData = req.body; // Updated donor data from the request body

    // Find the donor by ID in the database and update its information
    const updatedEvent = await treeEvent.findByIdAndUpdate(
      eventId,
      updatedEventData,
      { new: true }
    );

    res.json(updatedEvent); // Send back the updated donor object
  } catch (error) {
    console.error("Error updating Event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
