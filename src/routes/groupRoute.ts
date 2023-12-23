import { Router } from "express";
import groupController from "../controllers/groupController";

const groupRoute = Router();
export default groupRoute;

groupRoute.route("/").get(groupController.GET).post(groupController.POST);
