import User from "../models/User.js";

// ✅ Get current logged-in user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Get all users (optional - for admin/testing)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Update user (basic)
export const updateUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (email) user.email = email;

    await user.save();

    res.json({ msg: "User updated", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};