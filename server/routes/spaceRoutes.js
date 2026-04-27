import express from "express";
import {
  createSpace,
  getSpaces,
  joinSpace
} from "../controllers/spaceController.js";

const router = express.Router();

router.post("/create", createSpace);
router.get("/all", getSpaces);
router.post("/join", joinSpace);

export default router;