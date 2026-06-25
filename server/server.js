import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/route.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ✅ FIX: serve uploaded images
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api", router);

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});