// Import required packages
import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import validator from "validator";

// Define admin schema with email and password fields
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "must provide an email address"],
    unique: [true, "email already exists"],
    validate: {
      validator: isEmail,
      message: "invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "must provide a password"],
    // Password must be 8+ chars with 1 uppercase and 1 symbol
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value, {
          minLength: 8,
          minUppercase: 1,
          minSymbols: 1,
        });
      },
      message: "invalid password",
    },
  },
});

// Create and export Admin model
const AdminModel = mongoose.model("Admin", adminSchema);
export default AdminModel;