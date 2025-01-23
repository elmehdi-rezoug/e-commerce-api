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
    validate:{
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
      required: [true, "must provide at least one product"],
      validate:{
        validator: async (productIds) => {
            if (!Array.isArray(productIds) || productIds.length === 0) return false;
        
            const results = await Promise.all(
              productIds.map(async (id) => {
                    if (!mongoose.Types.ObjectId.isValid(id)) return null;
                    return await ProductModel.findById(id);
                })
            );
        
            return results.every((item) => item !== null);
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
      validate: {
        validator: async (cartIds) => {
          if (!Array.isArray(cartIds) || cartIds.length === 0) return false;
          const results = await Promise.all(
            cartIds.map(async (id) => {
              if (!mongoose.Types.ObjectId.isValid(id)) return null;
              return await CartModel.findById(id);
            })
          );
          return results.every((item) => item !== null);
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