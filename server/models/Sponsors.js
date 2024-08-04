import mongoose from "mongoose";


const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  eventID: {
    type: String,
    required: true,
    unique: true
  },
  eventName: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  province: {
    type: String,
    // required: true
  },
  district: {
    type: String,
    // required: true
  },
  city: {
    type: String,
    // required: true
  },
  donations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }]
});

Sponsors = mongoose.model('Sponsors', sponsorSchema);
export default Sponsors;