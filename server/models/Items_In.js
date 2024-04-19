import mongoose from "mongoose";

const Items_InSchema = new mongoose.Schema(
  {
   
    itemID: {
      type: String,
      required: true,
      min: 2,
      max: 100,
      unique: true,
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
    }
   
  },
  { timestamps: true }
);

const Items_In = mongoose.model("Items_In", Items_InSchema);
export default Items_In;
