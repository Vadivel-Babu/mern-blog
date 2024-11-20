import { Router } from "express";
import authController from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const route = Router();

route.post("/signup", authController.signUp);
route.post("/login", authController.login);
route.post("/logout", authController.logout);
route.get("/me", auth, authController.me);
export default route;
