// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Enable CORS
app.use(cors());
app.use(morgan('tiny'));



// Import and mount admin router
import adminRouter from "./routes/admin_routes.js";
app.use("/api/admins", adminRouter);

// Import and mount cart router
import cartRouter from "./routes/cart_routes.js";
app.use("/api/carts", cartRouter);

// Import and mount message router
import messageRouter from "./routes/message_routes.js";
app.use("/api/messages", messageRouter);

// Import and mount order router
import orderRouter from "./routes/order_routes.js";
app.use("/api/orders", orderRouter);

// Import and mount product router
import productRouter from "./routes/product_routes.js";
app.use("/api/products", productRouter);

// Import and mount user router
import userRouter from "./routes/user_routes.js";
import morgan from "morgan";
app.use("/api/users", userRouter);

// Connect to MongoDB database
mongoose.connect(process.env.DB_URL) 
    .then((result) => { 
        // Start the server on success
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`server is running on port ${process.env.SERVER_PORT}`); 
        });
    });