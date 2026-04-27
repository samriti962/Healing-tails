import Space from "../models/Space.js";
import User from "../models/User.js";

// ✅ Create Space
export const createSpace = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Space name required" });
    }

    const exists = await Space.findOne({ name });
    if (exists) {
      return res.status(400).json({ msg: "Space already exists" });
    }

    const space = await Space.create({
      name,
      description,
      members: []
    });

    res.json(space);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get All Spaces
export const getSpaces = async (req, res) => {
  try {
    const spaces = await Space.find();

    res.json(spaces);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Join Space
export const joinSpace = async (req, res) => {
  try {
    const { spaceId, userId } = req.body;

    const space = await Space.findById(spaceId);
    const user = await User.findById(userId);

    if (!space || !user) {
      return res.status(404).json({ msg: "Not found" });
    }

    // prevent duplicate join
    if (!space.members.includes(userId)) {
      space.members.push(userId);
      await space.save();
    }

    if (!user.joinedSpaces.includes(spaceId)) {
      user.joinedSpaces.push(spaceId);
      await user.save();
    }

    res.json({ msg: "Joined space successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};