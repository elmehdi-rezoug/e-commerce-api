import express from "express";
const router = express.Router();
import {
  allowBothMiddleware,
  adminMiddleware,
  userMiddleware,
} from "../middleware/authMiddleware.js";
import {
  getMessages,
  getMessageById,
  postMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/message_controller.js";

router
  .route("/")
  .get(adminMiddleware, getMessages)
  .post(allowBothMiddleware, postMessage);

router
  .route("/:id")
  .get(allowBothMiddleware, getMessageById)
  .patch(adminMiddleware, updateMessage)
  .delete(adminMiddleware, deleteMessage);

export default router;
