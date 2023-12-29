import { Server, Socket } from "socket.io";
import { createMessageGroup, getMessage } from "../controlls/message.controll";

const messageEvents = (socket: Socket, io: Server) => {
  // join group
  socket.on("join_group", (groupId) => {
    socket.join(groupId);
  });

  socket.on("get_massases", async (groupId) => {
    if (groupId) {
      const messages = await getMessage(groupId);
      io.to(groupId).emit("resive_message", messages);
    }
  });

  // Send message to group
  socket.on(
    "send_message",
    async (data: { message: string; groupId: string; senderId: string }) => {
      if (!data.groupId) return false;
      // update group last message and user
      await createMessageGroup(data);
      // find all message to send
      const messages = await getMessage(data.groupId);
      io.to(data.groupId).emit("resive_message", messages);
    }
  );
};

export default messageEvents;
