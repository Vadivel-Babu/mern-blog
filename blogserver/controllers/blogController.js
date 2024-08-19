import { Blog } from "../modals/blogModal.js";

//fetching all blogs
async function getAllBlogs(req, res) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.json({ message: "failed" });
    }
    const blogs = await Blog.find({ user: userId });
    res.json({ status: true, message: "All Blogs Fetched", data: blogs });
  } catch (error) {
    res.json({ message: error.message });
  }
}

//create new blog
async function createBlog(req, res) {
  try {
    const userId = req.user.id;
    const { title, category, content } = req.body;
    const blog = { user: userId, title, category, content };
    await Blog.create(blog);

    return res
      .status(201)
      .json({ status: true, message: "success", data: blog });
  } catch (error) {
    res.json({ message: error.message });
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
    res.json({ message: error.message });
  }
}

//delete the blog
async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    await Blog.deleteOne({ _id: id });
    res.json({ status: true, message: "Blog Deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
}

export default { getAllBlogs, createBlog, deleteBlog, updateBlog };
