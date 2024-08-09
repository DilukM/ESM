import mongoose from "mongoose";

const dEventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      default: "NULL",
    },
    date: {
      type: String,
      required: true,
      max: 50,
    },
    location: {
      type: String,
      default: "NULL",
    },
    description: {
      type: String,
      default: "NULL",
    },
  },
  { timestamps: true }
);

const dEvent = mongoose.model("dEvent", dEventSchema);
export default dEvent;
