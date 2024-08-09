import mongoose from "mongoose";

const Items_InSchema = new mongoose.Schema(
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
    donorId: {
      type: String,
      required: true,
      unique: true,
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
