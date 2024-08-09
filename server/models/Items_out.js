import mongoose from "mongoose";

const Items_outSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      max: 50,
    },
    quantity: {
      type: String,
      required: true,
      max: 50,
    },

    eventId: {
      type: String,
      required: true,
      min: 8,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
      min: 8,
    },
  },
  { timestamps: true }
);

const Items_out = mongoose.model("Items_out", Items_outSchema);
export default Items_out;
