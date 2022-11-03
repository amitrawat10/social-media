import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import connectDb from "./config/db.js";
import AuthRoute from "./routes/auth.js";
import chatRoute from "./routes/chatRoute.js";
import UserRoute from "./routes/userRoute.js";
import PostRoute from "./routes/postRoute.js";
import UploadRoute from "./routes/uploadRoute.js";
import messageRoute from "./routes/messageRoute.js";
const app = express();
app.use(cors());
dotenv.config({ path: "./config/config.env" });
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// serve imgs insdie public folder
app.use(express.static("public"));
app.use("/images", express.static("images"));

//routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

const PORT = process.env.PORT || 5000;
connectDb(process.env.MONGO_URI);
const server = app.listen(PORT, () =>
  console.log(`server running on port ${PORT}`)
);

// Socket implementation

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user._id === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    io.emit("get-users", activeUsers);
  });

  socket.on("send-msg", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    if (user) io.to(user.socketId).emit("receive-msg", data);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", activeUsers);
  });
});

export default server;
