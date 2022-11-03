import "./infoCard.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UilPen } from "@iconscout/react-unicons";
import { logout } from "../../actions/authAction";
import { useParams } from "react-router-dom";
import ProfileModal from "../profileModal/ProfileModal";
import * as UserApi from "../../api/userRequest.js";
const InfoCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (typeof profileUserId !== "undefined") {
        if (profileUserId === user._id) {
          // own profile
          setProfileUser(user);
        } else {
          // someone else's profile
          const { data } = await UserApi.getUser(profileUserId);
          setProfileUser(data);
        }
      }
    };
    fetchUserProfile();
  }, [profileUserId, user, profileUser]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {profileUser._id === user._id && (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setIsModalOpened(true)}
            />
            {isModalOpened && (
              <ProfileModal
                modalOpened={isModalOpened}
                setIsModalOpened={setIsModalOpened}
                data={profileUser}
              />
            )}
          </div>
        )}
      </div>
      <div className="info">
        <span>
          <strong>Status:</strong>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <strong>Lives in: </strong>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <strong>Works at: </strong>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      {user._id === profileUser._id && (
        <button className="button logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default InfoCard;
