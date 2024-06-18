import mongoose from "mongoose";

const treeEventSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: null,
    },
    eventID: {
      type: String,
      require: true,
      unique: true,
      min: 3,
    },
    eventName: {
      type: String,
      require: true,
      min: 2,
      max: 100,
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
    comment: {
      type: String,
      min: 5,
    },
    
  },
  { timestamps: true }
);

const TreeEvents = mongoose.model("TreeEvents", treeEventSchema);
export default TreeEvents;
