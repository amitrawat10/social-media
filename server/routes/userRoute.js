import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
  folowUser,
  unFollowUser,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/").get(getAllUser);
router.route("/:id/follow").put(folowUser);
router.route("/:id/unfollow").put(unFollowUser);

export default router;
