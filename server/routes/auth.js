import { Router } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import { AdminUser } from "../models/admin.js";

const router = Router();

router.post("/signin", async (req, res) => {
  try {
    // Validate request body
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user exists
    const user = await AdminUser.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Generate authentication token
    const token = user.generateAuthToken();

    // Return the token and user details (if necessary)
    res
      .status(200)
      .json({ data: { token, user }, message: "Logged in successfully" });
  } catch (error) {
    console.error("Sign-in error:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Validation schema
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

export default router;
