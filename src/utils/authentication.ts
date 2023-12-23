import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./service";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (token) {
    try {
      const data = verifyToken(token); // varify to next
      req.body = { ...req.body, ...(data as {}) };

      next(); // next function
    } catch (error) {
      return res
        .status(403)
        .send({ message: "Login expires, please login agin !" });
    }
  } else {
    return res
      .status(403)
      .send({ message: "You are not logged in please login agin !" });
  }
};
