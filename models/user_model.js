import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import validator from "validator";

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: [true, "must provide an email"], // Ensure email is provided
    unique: [true, "email already exists"], // Ensure email is unique
    validate: {
      validator: isEmail, // Validate email format using isEmail function
      message: "invalid email format", // Error message for invalid email
    },
  },
  password: {
    type: String,
    required: [true, "password is required"], // Ensure password is provided
  },
});

// Create the User model
const UserModel = mongoose.model("User", userSchema);

export default UserModel;