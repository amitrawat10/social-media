import express from "express";
import {
  createChat,
  userChats,
  findChat,
} from "../controllers/chatController.js";
const router = express.Router();

router.route("/").post(createChat);
router.route("/:userId").get(userChats);
router.route("/find/:firstId/:secondId").get(findChat);
export default router;
