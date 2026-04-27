import Post from "../models/Post.js";
import { isSensitive } from "../utils/moderation.js";

// ✅ Create Post
export const createPost = async (req, res) => {
  try {
    const { content, tags, spaceId, userName } = req.body;

    if (!content) {
      return res.status(400).json({ msg: "Content is required" });
    }

    const sensitive = isSensitive(content);

    const post = await Post.create({
      content,
      tags: tags || [],
      spaceId: spaceId || null,
      userName,
      sensitive
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get Feed (all posts for now)
export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};