// Import mongoose and ObjectId type
import mongoose from "mongoose";
import ProductModel from "./product_model.js";
import UserModel from "./user_model.js";

// Define cart schema with total price, user reference, and product list
const cartSchema = mongoose.Schema({
  totalPrice: { type: Number },
  // Reference to User model
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "cart must have a user"],
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
});

// Create and export Cart model
const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;