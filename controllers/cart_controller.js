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
    const products = await ProductModel.find({ _id: { $in: req.body.products } });
    if (products.length !== req.body.products.length) {
      return res.status(404).json({ message: "One or more products not found." });
    }

    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    const newCart = await CartModel.create({ ...req.body, totalPrice });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function updateCart(req, res) {
  try {
    const products = await ProductModel.find({ _id: { $in: req.body.products } });
    if (products.length !== req.body.products.length) {
      return res.status(404).json({ message: "One or more products not found." });
    }

    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    const cart = await CartModel.findByIdAndUpdate(req.params.id, {...req.body, totalPrice}, {
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


