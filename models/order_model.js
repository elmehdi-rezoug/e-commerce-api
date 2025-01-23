// Import mongoose package
import mongoose from "mongoose";
import {userIdChecker, productIdChecker, cartIdChecker} from "../utils/checkers.js";
// Define order schema with total price, payment status, user, products, and date
const orderSchema = mongoose.Schema({
  totalPrice: {
    type: Number,
    required: [true, "must provide order's total price"],
  },
  // Track payment status: Pending/Completed/Failed
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  // Reference to User model for order owner
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "order must have a user"],
    validate:{
      validator: async (userId)=>{
        return await userIdChecker(userId);
      },
      message: "user not found, provide a valid user."
    }
  },
  // Array of references to Product model
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "must provide at least one product"],
      validate:{
        validator: async (productIds)=>{
          return await productIdChecker(productIds);
        },
        message: "one or more products not found"
      }
    },
  ],
  carts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
      required: [true, "must provide at least one cart"],
      validate:{
        validator: async (cartIds)=>{
          return await cartIdChecker(cartIds);
        },
        message: "one or more carts not found"
      }
    }
  ],
  // Automatically set to current date when order is created
  date: { type: Date, default: Date.now },
});

// Create and export Order model
const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;