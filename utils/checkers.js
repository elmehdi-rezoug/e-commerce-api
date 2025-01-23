import UserModel from "../models/user_model.js";
import ProductModel from "../models/product_model.js";
import CartModel from "../models/cart_model.js";
import mongoose from "mongoose";
import validator from "validator";
// Helper function for ID validation and existence check
const validateIds = async (ids, Model) => {
    if (!Array.isArray(ids) || ids.length === 0) return false;

    const results = await Promise.all(
        ids.map(async (id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            return await Model.findById(id);
        })
    );

    return results.every((item) => item !== null);
};

// Check if a user ID is valid and exists
export const userIdChecker = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) return false;
    const user = await UserModel.findById(userId);
    return !!user;
};

// Check if product IDs are valid and exist
export const productIdChecker = (productIds) => validateIds(productIds, ProductModel);

// Check if cart IDs are valid and exist
export const cartIdChecker = (cartIds) => validateIds(cartIds, CartModel);
export const passwordChecker = (password) => {
    const isStrongPass = validator.isStrongPassword(password, {
        minLength: 8, // Minimum password length
        minUppercase: 1, // Require at least one uppercase letter
        minSymbols: 1,// Require at least one symbol
        minNumbers: 0,
        minLowercase: 0
    });
    return isStrongPass;
};