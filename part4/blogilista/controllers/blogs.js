const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
require("express-async-errors");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  const postedBlog = await blog.save();
  user.blogs = user.blogs.concat(postedBlog._id);
  await user.save();
  response.status(201).json(postedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const id = request.params.id;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updateBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });

  if (updateBlog) {
    response.status(200).json(updateBlog.toJSON());
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
