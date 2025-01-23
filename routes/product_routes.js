import express from "express";
const router = express.Router();
import {
  allowBothMiddleware,
  adminMiddleware,
  userMiddleware,
} from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product_controller.js";

router
  .route("/")
  .get(getProducts)
  .post(adminMiddleware, postProduct);

router
  .route("/:id")
  .get(getProductById)
  .patch(adminMiddleware, updateProduct)
  .delete(adminMiddleware, deleteProduct);

export default router;
