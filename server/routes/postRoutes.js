import express from "express";
import { createPost, getFeed } from "../controllers/postController.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/feed", getFeed);

export default router;