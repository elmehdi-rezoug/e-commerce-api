// Import mongoose package
import mongoose from "mongoose";
import UserModel from "./user_model.js";


// Define message schema with content and user reference
const messageSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, "must provide content"],
    minlength: 1,
  },
  // Reference to User model for message sender
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "message must have a user"],
    validate:{
              validator: async (userId) => {
                if (!mongoose.Types.ObjectId.isValid(userId)) return false;
                const user = await UserModel.findById(userId);
                return !!user;
            },
              message: "user not found, provide a valid user."
            }
  },
});

// Create and export Message model
const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;