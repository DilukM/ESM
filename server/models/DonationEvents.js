import mongoose from "mongoose";

const dEventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 100,
    },
    name: {
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
      default: 0,
    },
  },
  { timestamps: true }
);

const dEvent = mongoose.model("dEvent", dEventSchema);
export default dEvent;
