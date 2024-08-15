import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/donor-82405.appspot.com/o/donorEvents%2Fdefault-profile-pic-e1513291410505.jpg?alt=media&token=801ac0da-bcc7-47d8-a901-b5df9b50c74d",
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    score: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0, // Default rank is 0
    },
    gender: {
      type: String,
    },
    birthday: {
      type: Date,
    },
  },
  { timestamps: true }
);
const validatePass = (data) => {
  const schema = Joi.object({
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

const Donors = mongoose.model("Donors", DonorSchema);
export default Donors;
