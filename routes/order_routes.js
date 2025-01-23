import express from "express";
const router = express.Router();
import {
  allowBothMiddleware,
  adminMiddleware,
  userMiddleware,
} from "../middleware/authMiddleware.js";
import {
  getOrders,
  getOrderById,
  postOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order_controller.js";

router
  .route("/")
  .get(adminMiddleware, getOrders)
  .post(allowBothMiddleware, postOrder);

router
  .route("/:id")
  .get(allowBothMiddleware, getOrderById)
  .patch(adminMiddleware, updateOrder)
  .delete(adminMiddleware, deleteOrder);

export default router;
