import Mood from "../models/Mood.js";
import { calculateStreak } from "../utils/streak.js";

// ✅ Log Mood (1 per day)
export const logMood = async (req, res) => {
  try {
    const { userId, mood } = req.body;

    if (!userId || !mood) {
      return res.status(400).json({ msg: "userId and mood required" });
    }

    // Check if mood already logged today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await Mood.findOne({
      userId,
      date: { $gte: today }
    });

    if (existing) {
      return res.status(400).json({ msg: "Mood already logged today" });
    }

    const newMood = await Mood.create({
      userId,
      mood,
      date: new Date()
    });

    res.json(newMood);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get Streak
export const getStreak = async (req, res) => {
  try {
    const { userId } = req.params;

    const moods = await Mood.find({ userId }).sort({ date: 1 });

    const streak = calculateStreak(moods);

    res.json({ streak });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};