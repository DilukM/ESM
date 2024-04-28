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
    eventName: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
      // data: Buffer, // Store file as Buffer
      // contentType: String, // Store file content type
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
