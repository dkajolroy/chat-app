import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";

// Get all chat with me
const GET = async (req: Request, res: Response, next: NextFunction) => {
  const { id }: { id: string; email: string } = req.body;
  try {
    const chats = await prisma.group.findMany({
      where: {
        memberIds: {
          has: id,
        },
      },
      orderBy: {
        updated_at: "desc",
      },
      include: {
        members: true,
      },
    });
    res.status(200).send(chats);
  } catch (error) {
    next(error);
  }
};

interface InputGroupe {
  email: string;
  id: string;
  isGroup: boolean;
  friendIds: string[];
}
// start new Chats/Groups with me
const POST = async (req: Request, res: Response, next: NextFunction) => {
  const { id, friendIds, isGroup }: InputGroupe = req.body;
  console.log(friendIds, id);
  if (!friendIds || !id) {
    return res.status(400).send({ message: "Invalid formdata !" });
  }
  try {
    // Find already chats with my friend
    const chats = await prisma.group.findFirst({
      where: {
        memberIds: {
          equals: [id, ...friendIds],
        },
      },
    });
    if (chats && !chats.isGroup) {
      return res.status(404).send({ message: "Already with chats !" });
    }

    // Start New Chats / Group chats
    await prisma.group.create({
      data: {
        memberIds: [id, ...friendIds],
        isGroup: isGroup || false,
        adminId: id,
      },
    });
    res.status(201).send({ message: "Chat started successfully" });
  } catch (error) {
    next(error);
  }
};
export default { GET, POST };
