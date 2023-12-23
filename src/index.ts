import cookiePerser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import authRouter from "./routes/authRoute";
import groupRoute from "./routes/groupRoute";
import messageRoute from "./routes/messageRoute";
import userRoute from "./routes/userRoute";
import messageEvents from "./socket/events/messageEvents";
import {
  addOnlineUser,
  onlineUsers,
  removeOnlineUser,
} from "./socket/store/store";
import { auth } from "./utils/authentication";
// config app
const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookiePerser());
dotenv.config();

// public routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);
// private routes
app.use("/api/group", auth, groupRoute);
app.use("/api/message", messageRoute);

// render react production build
app.use(express.static(path.join(path.resolve(), "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "client/dist/index.html"));
});

// Listen server
httpServer.listen(port, () => {
  console.log(`Server⚡: listening at http://localhost:${port}`);
});

// Error handler
app.use((req, res) => {
  const statusCode = req.statusCode || 500;
  const message = req.body || { message: "Somethis want wrong !" };
  res.status(statusCode).send(message);
});

// configure socket server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.SOCKET_FRONTEND_URL || "/", // Development url // production auto
    credentials: true,
  },
});
io.on("connection", (socket) => {
  // Set new user to online // reload dev server
  socket.on("new_user", (userId: string) => {
    if (userId) {
      addOnlineUser({ userId: userId, socketId: socket.id });
      io.emit("get_online_user", onlineUsers);
    }
  });
  // all socket connections
  messageEvents(socket, io);
  // remove user
  socket.on("disconnect", () => {
    removeOnlineUser(socket.id);
    io.emit("get_online_user", onlineUsers);
    console.log("socket disconnected");
  });
});
