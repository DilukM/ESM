import mongoose from "mongoose";

const Items_outSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      max: 50,
    },
    itemId: {
      type: String,
      required: true,
      max: 50,
    },
    quantity: {
      type: String,
      required: true,
      max: 50,
    },
    unit: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
      min: 8,
    },

    eventId: {
      type: String,
      required: true,
      min: 8,
    },
    date: {
      type: String,
      required: true,
      min: 8,
    },
  },
  { timestamps: true }
);

const Items_out = mongoose.model("Items_out", Items_outSchema);
export default Items_out;
