import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import spaceRoutes from "./routes/spaceRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// ✅ CREATE APP FIRST
const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ ROUTES (AFTER app is created)
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/spaces", spaceRoutes);
app.use("/api/users", userRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ CONNECT DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});