// server side controller file (tree_plantation_event.js)
import jwt from "jsonwebtoken";
import treeEvent from "../models/TreePlantationEvent.js";

export const addTreeEvent = async (req, res) => {
  const {
    eventID,
    eventName,
    eventDate,
    province,
    district,
    city,
    comments,
  } = req.body;

  // Check if req.file exists and construct coverImage path
  const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const existingEvent = await treeEvent.findOne({ eventID });
    if (existingEvent) {
      return res.status(400).json({ error: "Event ID already exists" });
    }

    const newTreeEvent = new treeEvent({
      coverImage,
      eventID,
      eventName,
      eventDate,
      province,
      district,
      city,
      comments,
    });

    await newTreeEvent.save();

    const token = jwt.sign(
      { id: newTreeEvent._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error registering Tree Event:", error);
    res.status(500).json({ error: "Registration failed. Please try again later." });
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
    const treeEvent = await treeEvent.findById(id); // Correctly use the id param
    res.status(200).json(treeEvent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTreeEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await treeEvent.findByIdAndDelete(id); // Correct variable name
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
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
    const updatedEventData = req.body;
    if (req.file) {
      updatedEventData.coverImage = `/uploads/${req.file.filename}`;
    }

    const updatedEvent = await treeEvent.findByIdAndUpdate(
      eventId,
      updatedEventData,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating Event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
