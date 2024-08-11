import mongoose from "mongoose";

const dEventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/donor-82405.appspot.com/o/donorEvents%2Flogo.png?alt=media&token=56329902-eced-42ff-8a25-6fafa8d468a7",
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
