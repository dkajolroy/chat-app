import prisma from "../../utils/prisma";

export const getMessage = async (groupId: string) => {
  const messages = await prisma.message.findMany({
    where: {
      groupId: groupId,
    },
    include: {
      user: {
        select: {
          username: true,
          name: true,
          id: true,
          email: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return messages;
};

export const createMessageGroup = async (data: {
  message: string;
  groupId: string;
  senderId: string;
}) => {
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
};
