// Import mongoose and ObjectId type
import mongoose from "mongoose";
import {userIdChecker, productIdChecker} from "../utils/checkers.js";

// Define cart schema with total price, user reference, and product list
const cartSchema = mongoose.Schema({
  totalPrice: { type: Number },
  // Reference to User model
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "cart must have a user"],
    validate:{
          validator: userIdChecker,
          message: "user not found, provide a valid user."
        }
  },
  // Array of references to Product model
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      validate:{
        validator: async (productIds) => {
          return await productIdChecker(productIds);
        },
        message: "one or more products not found"
      }
    },
  ],
});

// Create and export Cart model
const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;