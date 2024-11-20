import { Router } from "express";
import auth from "../middleware/auth.js";
import notificationController from "../controllers/notificationController.js";

const route = Router();

route.get("/", auth, notificationController.getNotifications);
route.delete("/", auth, notificationController.deleteNotifications);

export default route;
