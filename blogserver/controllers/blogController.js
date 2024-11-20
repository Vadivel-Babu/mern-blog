import { Blog } from "../modals/blogModal.js";
import { User } from "../modals/userModal.js";
import { Notification } from "../modals/notificationModal.js";
import cloudinary from "cloudinary";

//fetching all blogs
async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: ["-password"] })
      .populate({
        path: "comments.user",
        select: [
          "-password",
          "-email",
          "-bio",
          "-followers",
          "-link",
          "-following",
        ],
      });

    if (blogs.length === 0) {
      return res.status(200).json({ data: [] });
    }
    res.json({ status: true, message: "All Blogs Fetched", data: blogs });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//create new blog
async function createBlog(req, res) {
  try {
    const userId = req.user.id;
    console.log(userId);
    console.log(req.body);

    let { title, content, img } = req.body;
    console.log(img);

    const currentUser = await User.findById({ _id: userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!title && !content) {
      return res
        .status(400)
        .json({ message: "Post must have content and title" });
    }
    if (img) {
      const upload = await cloudinary.uploader.upload(img);
      console.log(upload);

      img = upload.secure_url;
    }
    const blog = { user: userId, title, content, img };
    await Blog.create(blog);

    return res
      .status(201)
      .json({ status: true, message: "Post created", data: blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getSingleblog(req, res) {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id)
      .populate({
        path: "comments.user",
        select: [
          "-password",
          "-email",
          "-bio",
          "-followers",
          "-link",
          "-following",
        ],
      })
      .populate({ path: "user", select: ["-password"] });
    return res
      .status(200)
      .json({ status: true, message: "success", data: blog });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//update the blog
async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updateblog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updateblog) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ status: true, message: "Blog Updated", updateBlog });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//delete the blog
async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (blog.img) {
      await cloudinary.uploader.destroy(
        blog.img.split("/").pop().split(".")[0]
      );
    }
    await Blog.deleteOne({ _id: id });
    res.json({ status: true, message: "Blog Deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//handlelike
async function handleLike(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const blog = await Blog.findById({ _id: postId });

    if (!blog) {
      return res.status(400).json({ message: "Blog not found" });
    }
    const likedPost = blog.likes.includes(userId);
    if (likedPost) {
      await Blog.findByIdAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } }
      );
      await User.updateOne({ _id: userId }, { $pull: { likePost: postId } });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      blog.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likePost: postId } });
      await blog.save();
      const notification = new Notification({
        from: userId,
        to: blog.user,
        type: "like",
      });
      await notification.save();
      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//handlelike
async function createComment(req, res) {
  try {
    const { text } = req.body;

    const postId = req.params.id;
    const userId = req.user.id;
    if (!text.trim()) {
      return res.status(400).json({ message: "Comment is required" });
    }
    const blog = await Blog.findById({ _id: postId });
    if (!blog) {
      return res.status(400).json({ message: "Blog not found" });
    }
    const comment = {
      user: userId,
      text,
    };
    blog.comments.push(comment);
    await blog.save();
    res.status(201).json({ message: "comment posted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteComment(req, res) {
  try {
    const { postId, id } = req.params;
    const userId = req.user.id;

    const blog = await Blog.findById({ _id: postId });
    if (!blog) {
      return res.status(400).json({ message: "Blog not found" });
    }

    await Blog.findByIdAndUpdate(
      { _id: postId },
      { $pull: { comments: { _id: id } } }
    );

    await blog.save();

    res.status(201).json({ message: "comment deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//fetch liked blog by the user
async function getAllLikedBlogs(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const likedBlog = await Blog.find({
      _id: { $in: user.likedPosts },
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: [
          "-password",
          "-email",
          "-bio",
          "-followers",
          "-link",
          "-following",
        ],
      });
    if (likedBlog.length === 0) {
      return res.status(200).json({ data: [] });
    }
    res.json({ status: true, message: "All Blogs Fetched", data: likedBlog });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getFollowingUser(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const following = user.following;
    const feedPosts = await Blog.find({ user: { $in: following } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: [
          "-password",
          "-email",
          "-bio",
          "-followers",
          "-link",
          "-following",
        ],
      });

    res.status(200).json(feedPosts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getUserBlogs(req, res) {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ name: userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const blogs = await Blog.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: [
          "-password",
          "-email",
          "-bio",
          "-followers",
          "-link",
          "-following",
        ],
      });
    req.status(200).json(blogs);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getSingleblog,
  handleLike,
  createComment,
  getAllLikedBlogs,
  getFollowingUser,
  getUserBlogs,
  deleteComment,
};
