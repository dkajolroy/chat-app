import { Router } from "express";
import messageController from "../controllers/messageController";
const messageRoute = Router();
export default messageRoute;

messageRoute.route("/:groupId").get(messageController.GET);
