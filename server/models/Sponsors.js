import mongoose from "mongoose";


const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  sponsorID: {
    type: String,
    required: true,
    unique: true
  },
  sponsorName: {
    type: String,
    required: true
  },
  sponsorDate: {
    type: Date,
    required: true
  },
  donation: {
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