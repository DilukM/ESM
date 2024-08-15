// server side controller file (tree_plantation_event.js)
import jwt from "jsonwebtoken";
import tree from "../models/TreePlantationEvent.js";

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

  

  

  try {
    const existingEvent = await tree.findOne({ eventID });
    if (existingEvent) {
      return res.status(400).json({ error: "Event ID already exists" });
    }

    const newTreeEvent = new tree({
      eventID,
      eventName,
      eventDate,
      province,
      district,
      city,
      comments,
    });

    console.log(newTreeEvent);

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
    const treeEvents = await tree.find();
    res.status(200).json(treeEvents);
    console.log("success");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTreeEvent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log("sucess");

    const treeEvents = await tree.findById(id); // Correctly use the id param
    res.status(200).json(treeEvents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }


};

export const deleteTreeEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await tree.findByIdAndDelete(id); // Correct variable name
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
    // if (req.file) {
    //   updatedEventData.coverImage = `/uploads/${req.file.filename}`;
    // }

    const updatedEvent = await tree.findByIdAndUpdate(
      eventId,
      updatedEventData,
      { new: true }
    );
    console.log("success");

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating Event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getLastEvent = async (req, res) => {
  try {
    const lastEvent = await tree.findOne().sort({ createdAt: -1 });
    if (!lastEvent) {
      return res.status(404).json({ message: "No patients found" });
    }
    res.status(200).json(lastEvent);
  } catch (error) {
    console.error("Error fetching last patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
