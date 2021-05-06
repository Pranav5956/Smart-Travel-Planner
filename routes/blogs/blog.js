import express from "express";
import Blog from "../../models/Blog.js";
import Comment from "../../models/Comment.js";
import User from "../../models/User.js";

import comments from "./comment.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    const formattedBlogs = blogs.map((blog) => ({
      id: blog.id,
      likeCount: blog.likes.length,
      name: blog.name,
      description: blog.description,
      thumbnail: blog.thumbnail,
      cost: blog.cost,
      duration: blog.duration,
      contents: blog.contents,
      commentCount: blog.comments.length,
    }));
    res.json(formattedBlogs);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/:blogId", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    const likesNames = await User.find(
      { _id: { $in: blog.likes } },
      { username: 1, _id: 0 }
    );

    const comments = await Comment.find({ _id: { $in: blog.comments } });
    const commentsUsername = await User.find(
      {
        _id: { $in: comments.map((comment) => comment.author) },
      },
      { username: 1, _id: 0 }
    );
    const formattedBlog = {
      id: blog.id,
      likes: likesNames.map((user) => user.username),
      name: blog.name,
      description: blog.description,
      thumbnail: blog.thumbnail,
      cost: blog.cost,
      duration: blog.duration,
      contents: blog.contents,
      comments: comments.map((comment, index) => ({
        ...comment._doc,
        author: commentsUsername[index].username,
      })),
    };

    res.json(formattedBlog);
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, thumbnail, cost, duration, contents } = req.body;
    const newBlog = {
      name,
      description,
      thumbnail,
      contents,
      cost,
      duration,
      author: req.user.id,
    };

    await Blog.create(newBlog);
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/:blogId/like", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    const userId = req.user.id;

    const userHasAlreadyLiked = blog.likes.some((like) => like.equals(userId));

    if (userHasAlreadyLiked) blog.likes.pull(userId);
    else blog.likes.push(userId);

    await blog.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.put("/:blogId", async (req, res) => {
  try {
    const { name, description, thumbnail, cost, duration, contents } = req.body;
    await Blog.findByIdAndUpdate(req.params.blogId, {
      name,
      description,
      thumbnail,
      cost,
      duration,
      contents,
    });
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/:blogId", async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.blogId);
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.use(
  "/:blogId/comments",
  async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      req.blog = blog;
      next();
    } catch (err) {
      res.status(500).send();
    }
  },
  comments
);

export default router;
