import { Router } from "express";
import userController from "../controllers/userController";

const userRoute = Router();
export default userRoute;

userRoute
  .route("/")
  .post(userController.updateUser) // credentials
  .get(userController.getUser);
