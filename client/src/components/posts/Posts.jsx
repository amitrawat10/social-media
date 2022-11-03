import "./posts.css";
import Post from "../post/Post";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/postAction";
const Posts = () => {
  const param = useParams();
  const dispatch = useDispatch();
  let { loading, posts } = useSelector((state) => state.postReducer);
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [user._id, dispatch]);
  if (param.id) posts = posts.filter((post) => post.userId === param.id);
  return (
    <div className="Posts">
      {loading
        ? "Fetching posts..."
        : posts.map((post, id) => <Post data={post} id={id} />)}

      {!posts && (
        <div className="no-posts">
          <h4>No posts</h4>
        </div>
      )}
    </div>
  );
};

export default Posts;
