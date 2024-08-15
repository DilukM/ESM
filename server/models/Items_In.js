import mongoose from "mongoose";

const Items_InSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    donorId: {
      type: String,
      required: true,
      unique: false,
    },
    donorName: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
      min: 8,
    },
  },
  { timestamps: true }
);

const Items_In = mongoose.model("Items_In", Items_InSchema);
export default Items_In;
