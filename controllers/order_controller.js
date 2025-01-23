import OrderModel from "../models/order_model.js";
import CartModel from "../models/cart_model.js";
export async function getOrders(req, res) {
  try {
    const orders = await OrderModel.find()
      .populate("userId")
      .populate("products");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate("userId")
      .populate("products");
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function postOrder(req, res) {
  try {
    const tempObject ={
      carts: req.body.carts,
      userId: req.body.userId
    };
    req.body = tempObject;
    const carts = await Promise.all(req.body.carts.map(cartId => CartModel.findById(cartId)));
    req.body.products = [];
    req.body.totalPrice = 0;
    carts.forEach(cart => {
      req.body.products.push(...cart.products);
      req.body.totalPrice += cart.totalPrice;
    });
    const order = await OrderModel.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function updateOrder(req, res) {
  try {
    const tempObject ={
      carts: req.body.carts,
      paymentStatus: req.body.paymentStatus,
      userId: req.body.userId
    };
    req.body = tempObject;
    const carts = await Promise.all(req.body.carts.map(cartId => CartModel.findById(cartId)));
    req.body.products = [];
    req.body.totalPrice = 0;
    carts.forEach(cart => {
      req.body.products.push(...cart.products);
      req.body.totalPrice += cart.totalPrice;
    });
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators:true
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function deleteOrder(req, res) {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}
