import "./chatBox.css";
import { format } from "timeago.js";
import { useState, useEffect, useRef } from "react";
import { getUser } from "../../api/userRequest";
import { addMessage, getMessages } from "../../api/messageRequest";
import InputEmoji from "react-input-emoji";
const ChatBox = ({ currentUser, chat, setSendMsg, receivedMsg }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const scroll = useRef();
  useEffect(() => {
    const userid = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userid);
        setUserData(data);
      } catch (e) {
        console.log(e);
      }
    };

    if (chat != null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (e) {
        console.log(e);
      }
    };
    if (chat != null) fetchChatMessages();
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleChange = (newMsg) => {
    setNewMsg(newMsg);
  };
  const handleSend = async (e) => {
    e.preventDefault();
    if (newMsg) {
      const message = {
        senderId: currentUser,
        text: newMsg,
        chatId: chat._id,
      };

      const receiverId = chat.members.find((id) => id !== currentUser);
      setSendMsg({ ...message, receiverId });

      try {
        const { data } = await addMessage(message);
        // console.log(data);
        setMessages([...messages, data]);
        setNewMsg("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // receive msgs from parent componetnt
  useEffect(() => {
    if (receivedMsg != null && receivedMsg.chatId === chat._id) {
      setMessages([...messages, receivedMsg]);
    }
  }, [receivedMsg]);
  return (
    <>
      <div className="chatbox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt=""
                    className="followerImage"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>

              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>

            {/* Chat Body */}
            <div className="chat-body">
              {messages &&
                messages.map((msg) => (
                  <>
                    <div
                      ref={scroll}
                      className={
                        msg.senderId === currentUser ? "message own" : "message"
                      }
                    >
                      <span>{msg.text}</span>
                      <span className="timeago">{format(msg.createdAt)}</span>
                    </div>
                  </>
                ))}
            </div>
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji
                value={newMsg}
                onChange={handleChange}
                cleanOnEnter={true}
                placeholder="Type a message"
              />
              <input type="file" name="" id="" style={{ display: "none" }} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>

      {/* chat input */}
    </>
  );
};

export default ChatBox;
