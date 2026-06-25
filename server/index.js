import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";

import route from "./routes/route.js";

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api", route);

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});