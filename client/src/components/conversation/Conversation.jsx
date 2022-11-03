import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/userRequest";
const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser); // get userId of person to have chat with
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        dispatch({ type: "SAVE_USER", data: data });
      } catch (e) {
        console.log(e);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <div className="conversation follower">
        <div>
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            alt="chat-user-pic"
            className="followerImage"
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            {online && (
              <span style={{ color: "#00af4f", fontWeight: "600" }}>
                online
              </span>
            )}
            {/* <div className="online-dot"></div> */}
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
