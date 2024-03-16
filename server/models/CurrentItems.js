import mongoose from "mongoose";

const CurrentItemSchema = new mongoose.Schema(
  {
    // avatar: {
    //   type: String,
    //   default: "NULL",
    // },
    itemId: {
      type: String,
      required: true,
      min: 2,
      max: 100,
      unique: true,
    },
    itemName: {
      type: String,
      required: true,
      max: 100,
      
    },
    quantity: {
      type: Number,
      required: true,
      
    },
    date: {
      type: Date,
      required: true,
      min: 8,
    },
    // score: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { timestamps: true }
);

const CurrentItems = mongoose.model("CurrentItems", CurrentItemSchema);
export default CurrentItems;
