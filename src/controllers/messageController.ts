import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";

const GET = async (req: Request, res: Response, next: NextFunction) => {
  const { groupId } = req.params;
  if (!groupId || groupId === "undefined") {
    return res.status(404).send({ message: "Invalid group ids" });
  }
  try {
    const message = await prisma.message.findMany({
      where: {
        groupId,
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
    });

    res.status(200).send(message);
  } catch (error) {
    next(error);
  }
};

export default { GET };
