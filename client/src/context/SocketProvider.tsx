import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { RootState } from "../store/store";

// Import Socket server for development
const serverUrl = import.meta.env.VITE_SOCKET_SERVER_URL;
const socketConnect = io(
  process.env.NODE_ENV !== "production" ? serverUrl : "/",
  {
    withCredentials: true,
  }
);
interface Props {
  children: React.ReactNode;
}
interface OnlineUser {
  userId: string;
  socketId: string;
}
// Create socket Context
const SocketContext = createContext<{
  socket: Socket;
  onlineUsers: OnlineUser[];
}>({
  socket: socketConnect,
  onlineUsers: [],
});
export default function SocketProvider({ children }: Props) {
  const { user } = useSelector((s: RootState) => s.auth);

  // Online users list
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]); // Online users store

  useEffect(() => {
    socketConnect.emit("new_user", user?.id);
    socketConnect.on("get_online_user", (users) => {
      setOnlineUsers(users);
    });
  }, [socketConnect, user]);

  return (
    <SocketContext.Provider value={{ socket: socketConnect, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}

// Returns hooks for easy access
export const useSocketContext = () => {
  const { socket, onlineUsers } = useContext(SocketContext);

  return { socket, onlineUsers };
};
