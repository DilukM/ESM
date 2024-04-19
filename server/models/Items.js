import mongoose from "mongoose";

const ItemsSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      min: 2,
      max: 100,
      unique: false,
    },
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
      unique: false,
    },

    date: {
      type: String,
      required: false,
      min: 2,
      default: null,
    },
  },
  { timestamps: true }
);

const Items = mongoose.model("Items", ItemsSchema);
export default Items;
