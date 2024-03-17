import mongoose from "mongoose";

const ReleaseItemSchema = new mongoose.Schema(
  {
    // avatar: {
    //   type: String,
    //   default: "NULL",
    // },
    eventid: {
      type: String,
      required: true,
      min: 2,
      max: 100,
      unique: true,
    },
    itemId: {
      type: String,
      required: true,
      max: 100,
      unique: true,
    },
    date: {
        type: Date,
        required: true,
        min: 8,
      },

    quantity: {
      type: Number,
      required: true,
      
    },
    
    // score: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { timestamps: true }
);

const ReleaseItems = mongoose.model("ReleaseItems", ReleaseItemSchema);
export default ReleaseItems;
