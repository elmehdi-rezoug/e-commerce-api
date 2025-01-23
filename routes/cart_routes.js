import express from "express";
const router = express.Router();
import {
  allowBothMiddleware,
  adminMiddleware,
  userMiddleware,
} from "../middleware/authMiddleware.js";
import {
  getCarts,
  getCartById,
  postCart,
  updateCart,
  deleteCart,
} from "../controllers/cart_controller.js";

router
  .route("/")
  .get(adminMiddleware, getCarts)
  .post(allowBothMiddleware, postCart);

router
  .route("/:id")
  .get(allowBothMiddleware, getCartById)
  .patch(allowBothMiddleware, updateCart)
  .delete(allowBothMiddleware, deleteCart);
export default router;
