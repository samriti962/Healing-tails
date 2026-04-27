import express from "express";
import { logMood, getStreak } from "../controllers/moodController.js";

const router = express.Router();

router.post("/log", logMood);
router.get("/streak/:userId", getStreak);

export default router;