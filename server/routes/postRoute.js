import express from "express";
import {
  createPost,
  getPost,
  getTimelinePosts,
  likeDislikePost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
const router = express.Router();

router.route("/").post(createPost);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);
router.route("/:id/like").put(likeDislikePost);
router.route("/:id/timeline").get(getTimelinePosts);
export default router;
