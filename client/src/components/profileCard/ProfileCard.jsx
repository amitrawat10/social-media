import "./profileCard.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as UserApi from "../../api/userRequest.js";
import { NavLink, useParams } from "react-router-dom";
const ProfileCard = ({ location }) => {
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState(null);
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (location === "profilePage") {
        if (profileUserId) {
          if (profileUserId === user._id) {
            setProfileUser(user); // current user profile
          } else {
            const { data } = await UserApi.getUser(profileUserId);
            setProfileUser(data);
          }
        }
      } else {
        setProfileUser(user);
      }
    };
    fetchUserProfile();
  }, [profileUserId]);
  return (
    profileUser && (
      <div className="ProfileCard">
        <div className="profileImages">
          <img
            src={
              profileUser.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + profileUser.coverPicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultCover.jpg"
            }
            alt="cover"
            className={location === "profilePage" ? "profilePage-cover" : ""}
          />

          <img
            src={
              profileUser.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER +
                  profileUser.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            alt="profile"
          />
        </div>

        <div className="profileName">
          <span>
            {profileUser.firstname} {profileUser.lastname}
          </span>
          <span style={{ fontSize: "12px" }}>
            {profileUser.worksAt
              ? profileUser.worksAt
              : "Write about yourself.."}
          </span>
        </div>

        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{user.followers.length}</span>
              <span>Followers</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{user.following.length}</span>
              <span>Following</span>
            </div>
            {location === "profilePage" && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>
                    {posts.filter((post) => post.userId === user._id).length}
                  </span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>
        {location === "profilePage" ? (
          ""
        ) : (
          <span>
            <NavLink
              to={`/profile/${profileUser._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              My Profile
            </NavLink>
          </span>
        )}
      </div>
    )
  );
};

export default ProfileCard;
