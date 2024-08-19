import { Router } from "express";
import blogController from "../controllers/blogController.js";
import auth from "../middleware/auth.js";

const route = Router();

route.get("/getblogs", blogController.getAllBlogs);
route.post("/createblog", auth, blogController.createBlog);
route.delete("/deleteblog/:id", auth, blogController.deleteBlog);
route.put("/updateblog/:id", auth, blogController.updateBlog);

export default route;
