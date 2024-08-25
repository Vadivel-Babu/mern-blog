import { Blog } from "../modals/blogModal.js";

//fetching all blogs
async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find();
    res.json({ status: true, message: "All Blogs Fetched", data: blogs });
  } catch (error) {
    res.json({ message: error.message });
  }
}

//create new blog
async function createBlog(req, res) {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;
    const blog = { user: userId, title, content };
    await Blog.create(blog);

    return res
      .status(201)
      .json({ status: true, message: "success", data: blog });
  } catch (error) {
    res.json({ message: error.message });
  }
}

async function getSingleblog(req, res) {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    return res
      .status(200)
      .json({ status: true, message: "success", data: blog });
  } catch (error) {}
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

export default {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getSingleblog,
};
