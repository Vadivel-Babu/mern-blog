import { Router } from "express";
import blogController from "../controllers/blogController.js";
import auth from "../middleware/auth.js";

const route = Router();

route.get("/", blogController.getAllBlogs);
route.get("/:id", blogController.getSingleblog);
route.post("/", auth, blogController.createBlog);
route.delete("/:id", auth, blogController.deleteBlog);
route.put("/:id", auth, blogController.updateBlog);

export default route;
