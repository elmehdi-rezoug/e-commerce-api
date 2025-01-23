import CartModel from "../models/cart_model.js";
import ProductModel from "../models/product_model.js";
export async function getCarts(req, res) {
  try {
    const carts = await CartModel.find()
      .populate("products")
      .populate("userId");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCartById(req, res) {
  try {
    const cart = await CartModel.findById(req.params.id)
      .populate("products")
      .populate("userId");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postCart(req, res) {
  try {
    req.body.totalPrice = 0;
    
    // Fetch all products in parallel
    const products = await Promise.all(req.body.products.map(productId => ProductModel.findById(productId)));

    // Calculate the total price
    for (const product of products) {
      if (product) {
        req.body.totalPrice += product.price;
      } else {
        return res.status(404).json({ message: "a product is not found!" }); // 404 for not found
      }
    }

    // Create the cart and respond with the created cart
    const cart = await CartModel.create(req.body);
    res.status(201).json(cart);

  } catch (error) {
    console.error(error); // Optional: log error for debugging purposes
    res.status(500).json({ error: error.message });
  }
}


export async function updateCart(req, res) {
  try {
    req.body.totalPrice = 0;
    
    // Fetch all products in parallel
    const products = await Promise.all(req.body.products.map(productId => ProductModel.findById(productId)));

    // Calculate the total price
    for (const product of products) {
      if (product) {
        req.body.totalPrice += product.price;
      } else {
        return res.status(404).json({ message: "a product is not found!" }); // 404 for not found
      }
    }
    const cart = await CartModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteCart(req, res) {
  try {
    const cart = await CartModel.findByIdAndDelete(req.params.id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


