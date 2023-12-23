import { Router } from "express";
import authController from "../controllers/authController";

const authRouter = Router();
export default authRouter;

authRouter.post("/signup", authController.signUp); // credentials
authRouter.post("/signin", authController.signIn); // credentials
authRouter.post("/oauth", authController.oAuth); // social providers
