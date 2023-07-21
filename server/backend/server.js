const express = require("express");
const cors = require("cors");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Api is running successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log("Server started on 5000");
});

const io = require("socket.io")(server, {
  pingTimeOut: 60000,
  cors: {
    origin: "https://chat-hub-server.onrender.com",
  },
});

io.on("connection", (socket) => {
  console.log("Sockets are in action");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData.name, "connected");
    socket.emit("connected");
  });
  socket.on("join-chat", (room) => {
    socket.join(room);
    // console.log("User joined room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));
  socket.on("new-message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    console.log(chat?.users);
    chat.users.forEach((user) => {
      // console.log(user);
      socket.in(user).emit("message-recieved", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
