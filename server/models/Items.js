import mongoose from "mongoose";

const ItemsSchema = new mongoose.Schema(
  {
   
    itemID: {
      type: String,
      required: true,
      min: 2,
      max: 100,
      unique: true,
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
      unique: true,
    },
    
    
    // points: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    date: {
      type: Date,
    required: true,
    min: 8,
  }
    
   
  },
  { timestamps: true }
);

const Items = mongoose.model("Items", ItemsSchema);
export default Items;
