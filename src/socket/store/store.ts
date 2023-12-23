import { OnlineUser } from "../../types/data";

// Online users Storage
export let onlineUsers: OnlineUser[] = [];

// Add OnlineUser
export const addOnlineUser = ({ userId, socketId }: OnlineUser) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};
// Get OnlineUser
export const getOnlineUser = (userId: string) => {
  const user = onlineUsers.find((user) => user.userId.toString() === userId);
  console.log(userId);
  console.log(user);
  return user;
};

// Remove OnlineUser
export const removeOnlineUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
