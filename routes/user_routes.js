import express from "express";
const router = express.Router();
import {
  allowBothMiddleware,
  adminMiddleware,
  userMiddleware,
} from "../middleware/authMiddleware.js";
import {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
  login,
} from "../controllers/user_controller.js";

router.route("/").get(adminMiddleware, getUsers).post(postUser);

router
  .route("/:id")
  .get(allowBothMiddleware, getUserById)
  .patch(allowBothMiddleware, updateUser)
  .delete(allowBothMiddleware, deleteUser);

router.route("/login").post(login);
export default router;
