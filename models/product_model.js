import mongoose from "mongoose";

// Define the product schema
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a product name"], // Ensure name is provided
    unique: [true, "product name must be unique"], // Ensure name is unique
  },
  category: {
    type: String,
    enum: ["Clothing", "Electronics", "Furniture", "Books"], // Restrict category to valid options
    required: [true, "must choose a category"], // Ensure category is selected
  },
  image: { type: String, required: [true, "must provide an image"] }, // Ensure image is provided
  price: { type: Number, required: [true, "must provide a product price"] }, // Ensure price is provided
});

// Create the Product model
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;