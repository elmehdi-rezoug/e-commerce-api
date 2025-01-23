// Import mongoose package
import mongoose from "mongoose";
import ProductModel from "./product_model.js";
import UserModel from "./user_model.js";
import CartModel from "./cart_model.js";
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
    validate: {
      validator: async (userId) => {
        if (!mongoose.Types.ObjectId.isValid(userId)) return false;
        const user = await UserModel.findById(userId);
        return !!user;
      },
      message: "user not found, provide a valid user."
    }
  },
  // Array of references to Product model
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      validate: {
        validator: async (productId) => {
          if (!mongoose.Types.ObjectId.isValid(productId)) return false;
          const product = await ProductModel.findById(productId);
          return !!product;
        },
        message: "One or more products are invalid or not found."
      },
    },
  ],
  carts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
      required: [true, "must provide at least one cart"],
      validate: {
        validator: async (cartId) => {
          if (!mongoose.Types.ObjectId.isValid(cartId)) return false;
          const cart = await CartModel.findById(cartId);
          return !!cart;
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