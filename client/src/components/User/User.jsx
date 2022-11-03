import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userAction";
import { NavLink } from "react-router-dom";

const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [following, setIsFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? process.env.REACT_APP_PUBLIC_FOLDER + person.profilePicture
              : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
          }
          alt=""
          className="followerImg"
        />
        <div className="name">
          <span>
            <NavLink to={`/profile/${person._id}`}>
              {" "}
              {person.firstname} {person.lastname}
            </NavLink>
          </span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={following ? "button fc-btn  unfollowBtn" : "button fc-btn"}
        onClick={handleFollow}
      >
        {" "}
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
