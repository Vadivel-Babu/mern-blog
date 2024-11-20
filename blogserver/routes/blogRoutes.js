import { Router } from "express";
import blogController from "../controllers/blogController.js";
import auth from "../middleware/auth.js";

const route = Router();

route.get("/all", blogController.getAllBlogs);
route.get("/likes/:id", auth, blogController.getAllLikedBlogs);
route.get("/user/:userName", auth, blogController.getUserBlogs);
route.get("/following", auth, blogController.getFollowingUser);
route.get("/:id", blogController.getSingleblog);
route.post("/", auth, blogController.createBlog);
route.delete("/:id", auth, blogController.deleteBlog);
route.put("/:id", auth, blogController.updateBlog);
route.post("/like/:id", auth, blogController.handleLike);
route.post("/comment/:id", auth, blogController.createComment);
route.delete("/comment/:postId/:id", auth, blogController.deleteComment);

export default route;
