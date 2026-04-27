import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space"
    },
    sensitive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;