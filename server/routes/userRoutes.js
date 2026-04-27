import express from "express";
import {
  getCurrentUser,
  getAllUsers,
  updateUser
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user
router.get("/me", authMiddleware, getCurrentUser);

// Get all users (optional)
router.get("/", getAllUsers);

// Update user
router.put("/update", authMiddleware, updateUser);

export default router;