import "./chat.css";
import { useRef, useState, useEffect } from "react";
import NavIcons from "../../components/navLinks/NavIcons";
import { userChats } from "../../api/chatRequest";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import { useSelector } from "react-redux";
import Conversation from "../../components/conversation/Conversation";
import ChatBox from "../../components/chatBox/ChatBox";
import { io } from "socket.io-client";
const Chat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMsg, setSendMsg] = useState(null);
  const [receivedMsg, setReceivedMsg] = useState(null);
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  // get the user chats (chat contacts)
  useEffect(() => {
    const getUserChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (e) {
        console.log(e);
      }
    };
    getUserChats();
  }, [user._id]);

  // connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // send msg to socket server
  useEffect(() => {
    if (sendMsg != null) socket.current.emit("send-msg", sendMsg);
  }, [sendMsg]);

  // get msg from socket server
  useEffect(() => {
    socket.current.on("receive-msg", (data) => {
      setReceivedMsg(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user._id);
    const isOnline = onlineUsers.find((user) => user.userId === chatMembers);
    return isOnline === true;
  };
  return (
    <div className="Chat">
      <div className="left-side-chat">
        <LogoSearch />
        <div className="chat-container">
          <h2>Chats</h2>
          <div className="chat-list">
            {chats &&
              chats.map((chat, i) => (
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                  key={i}
                >
                  <Conversation
                    data={chat}
                    currentUser={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="right-side-chat">
        <div
          style={{ width: "20rem", alignSelf: "flex-end" }}
          className="chat-nav-icons"
        >
          <NavIcons />
        </div>
        <ChatBox
          currentUser={user._id}
          chat={currentChat}
          setSendMsg={setSendMsg}
          receivedMsg={receivedMsg}
        />
      </div>
    </div>
  );
};

export default Chat;
