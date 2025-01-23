import express from "express";
const router = express.Router();
import {
  allowBothMiddleware,
  adminMiddleware,
  userMiddleware,
} from "../middleware/authMiddleware.js";
import {
  getAdmins,
  getAdminById,
  postAdmin,
  updateAdmin,
  deleteAdmin,
  login,
} from "../controllers/admin_controller.js";

router.route("/").get(adminMiddleware, getAdmins).post(postAdmin);

router
  .route("/:id")
  .get(adminMiddleware, getAdminById)
  .patch(adminMiddleware, updateAdmin)
  .delete(adminMiddleware, deleteAdmin);

router.route("/login").post(login);

export default router;
