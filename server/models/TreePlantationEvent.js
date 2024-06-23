import mongoose from "mongoose";

const treeEventSchema = new mongoose.Schema(
  {
    coverImage: {
      type: String, // Store the path or filename of the image
    },
    eventID: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    eventName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    eventDate: {
      type: Date,
    },
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

const TreeEvents = mongoose.model("TreeEvents", treeEventSchema);
export default TreeEvents;
