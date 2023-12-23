import { NextFunction, Request, Response } from "express";

function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}
function getUser(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

const userController = { getUser, updateUser };

export default userController;
