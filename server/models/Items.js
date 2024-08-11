import mongoose from "mongoose";

const ItemsSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    unit: {
      type: String,
      required: true,
      max: 50,
    },

    unitScore: {
      type: Number,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

const Items = mongoose.model("Items", ItemsSchema);
export default Items;
