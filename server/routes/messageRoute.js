import express from "express";
import { addMessage, getMessages } from "../controllers/messageController.js";
const router = express.Router();

router.route("/").post(addMessage);
router.route("/:chatId").get(getMessages);
export default router;
