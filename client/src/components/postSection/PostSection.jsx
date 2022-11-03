import Posts from "../posts/Posts";
import PostShare from "../postShare/PostShare";
import "./postSection.css";

const PostSection = ({ location }) => {
  return (
    <div className="PostSection">
      {location !== "profilePage" && <PostShare />}
      <Posts />
    </div>
  );
};

export default PostSection;
