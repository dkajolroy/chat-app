import { Server, Socket } from "socket.io";
import prisma from "../../utils/prisma";

const messageEvents = (socket: Socket, io: Server) => {
  // join group
  socket.on("join_group", (groupId) => {
    socket.join(groupId);
  });

  // Send message to group
  socket.on(
    "send_message",
    async (data: { message: string; groupId: string; senderId: string }) => {
      if (!data.groupId) return false;
      await prisma.group.update({
        where: {
          id: data.groupId,
        },
        data: {
          lastMessage: data.message || "Send Atachment",
          lastMessageBy: data.senderId,
          message: {
            create: {
              message: data.message,
              userId: data.senderId,
            },
          },
        },
      });

      socket.to(data.groupId).emit("resive_message", { message: data.message });
    }
  );
};

export default messageEvents;
