import { Router } from "express";
import userController from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const route = Router();

route.get("/profile/:id", auth, userController.getProfile);
route.get("/follow/:id", auth, userController.handleFollow);
route.put("/profile", auth, userController.updateUser);
export default route;
