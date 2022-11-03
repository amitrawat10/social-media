import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { likePost } from "../../api/postRequest";
import * as UserApi from "../../api/userRequest.js";

import "./post.css";
import { useEffect } from "react";
const Post = ({ data, id }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [isLiked, setIsLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [postUser, setPostUser] = useState({});
  const handleLike = (e) => {
    likePost(data._id, user._id);
    setIsLiked((prev) => !prev);
    isLiked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  useEffect(() => {
    const fetchPostUser = async (postuserId) => {
      const { data: ps } = await UserApi.getUser(postuserId);
      setPostUser(ps);
    };
    fetchPostUser(data.userId);
  }, [data.userId]);
  return (
    <div className="Post">
      <div className="post-user">
        <img
          src={
            postUser &&
            process.env.REACT_APP_PUBLIC_FOLDER + postUser.profilePicture
          }
          alt=""
        />
        <span>
          {postUser && postUser.firstname} {postUser.lastname} added a post
        </span>
      </div>
      {data.image && (
        <img
          src={process.env.REACT_APP_PUBLIC_FOLDER + data.image}
          alt="post-img"
        />
      )}
      <div className="postReact">
        <img
          src={isLiked ? Heart : NotLike}
          alt="like-unlike"
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span
        style={{ color: "var(--gray)", fontWeight: "550", fontSize: "10px" }}
      >
        {likes} likes
      </span>
      <div className="details">
        <span>
          <strong>{data.name} </strong>
        </span>
        <span style={{ fontSize: "13px" }}>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
