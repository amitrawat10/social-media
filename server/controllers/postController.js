import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json("ERROR");
  }
};

export const getPost = async (req, res) => {
  const postId = req.params.id;
  if (postId === "" || postId == null || typeof postId == undefined)
    return res.status(400).json("bad request");
  try {
    const post = await Post.findById(postId);
    if (post) return res.status(200).json(post);
    else return res.status(404).json("Wrong post id");
  } catch (error) {
    console.log(error);
    return res.status(500).json("ERROR");
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  if (postId === "" || postId == null || typeof postId == undefined)
    return res.status(400).json("bad request");
  const { userId: currentUserId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (post) {
      if (post.userId.toString() === currentUserId) {
        await post.updateOne({ $set: req.body });
        return res.status(200).json("post updated");
      } else {
        return res.status(403).json("forbidden");
      }
    } else {
      return res.status(404).json("no post found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("ERROR");
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  if (postId === "" || postId == null || typeof postId == undefined)
    return res.status(400).json("bad request");
  const { currentUserId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (post) {
      if (post.userId.toString() === currentUserId) {
        await Post.deleteOne();
        return res.status(200).json("post deleted");
      } else {
        return res.status(403).json("forbidden");
      }
    } else {
      return res.status(404).json("no post found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("ERROR");
  }
};

export const likeDislikePost = async (req, res) => {
  const postId = req.params.id;
  if (postId === "" || postId == null || typeof postId == undefined)
    return res.status(400).json("bad request");
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (post) {
      // check whether the post is already liked or not.
      if (post.likes.includes(userId)) {
        // already liked. so dislike it
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("post disliked");
      } else {
        // not liked. so like it
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json("post liked");
      }
    } else {
      return res.status(404).json("no post found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("ERROR");
  }
};

export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  if (userId === "" || userId == null || typeof userId == undefined)
    return res.status(400).json("bad request");
  try {
    const currentUserPosts = await Post.find({ userId });
    if (
      !currentUserPosts ||
      typeof currentUserPosts == undefined ||
      currentUserPosts == null
    )
      currentUserPosts = [];

    // get posts of users whom currentUser follows
    const followingUsersPosts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingUsersPosts",
        },
      },
      {
        $project: {
          followingUsersPosts: 1,
          _id: 0,
        },
      },
    ]);

    res
      .status(200)
      .json(
        currentUserPosts
          .concat(...followingUsersPosts[0].followingUsersPosts)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json("ERROR");
  }
};
