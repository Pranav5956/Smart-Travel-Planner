import express from "express";
import Blog from "../../models/Blog.js";
import Comment from "../../models/Comment.js";
import User from "../../models/User.js";
import { recommendBlogs } from "../../recommender/blogs/recommender.js";
import { updateWeight } from "../../recommender/blogs/utilities.js";

import comments from "./comment.js";

const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({
      createdAt: -1,
    });

    const authors = await User.find({
      _id: { $in: blogs.map((blog) => blog.author) },
    });
    const formattedBlogs = blogs.map((blog) => ({
      ...blog._doc,
      authorName: authors.find(
        (author) => String(author._id) === String(blog.author)
      ).username,
    }));

    res.json(formattedBlogs);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/others", async (req, res) => {
  try {
    const blogs = await Blog.find({ author: { $ne: req.user.id } }).sort({
      createdAt: -1,
    });

    const authors = await User.find({
      _id: { $in: blogs.map((blog) => blog.author) },
    });
    const formattedBlogs = blogs.map((blog) => ({
      ...blog._doc,
      authorName: authors.find(
        (author) => String(author._id) === String(blog.author)
      ).username,
    }));

    res.json(formattedBlogs);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/others/recommended", async (req, res) => {
  try {
    const blogIds = await recommendBlogs(req.user.id);
    const blogs = await Blog.find({
      _id: { $in: blogIds.map((blogId) => blogId.blogId) },
    });

    const authors = await User.find({
      _id: { $in: blogs.map((blog) => blog.author) },
    });
    const formattedBlogs = blogs.map((blog) => ({
      ...blog._doc,
      authorName: authors.find(
        (author) => String(author._id) === String(blog.author)
      ).username,
    }));

    res.json(formattedBlogs);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/:blogId", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    const author = await User.findOne(
      {
        _id: blog.author,
      },
      { _id: 1, username: 1 }
    );
    const likesNames = await User.find(
      { _id: { $in: blog.likes } },
      { username: 1, _id: 1 }
    );

    const comments = await Comment.find({ _id: { $in: blog.comments } }).sort({
      createdAt: -1,
    });
    const commentsUsername = await User.find(
      {
        _id: { $in: comments.map((comment) => comment.author) },
      },
      { username: 1, _id: 1 }
    );
    const formattedBlog = {
      ...blog._doc,
      author: author,
      likes: likesNames,
      comments: comments.map((comment) => ({
        ...comment._doc,
        author: commentsUsername.find(
          (user) => String(user._id) === String(comment.author)
        ),
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
    const {
      name,
      description,
      thumbnail,
      cost,
      duration,
      contents,
      itinerary,
    } = req.body;
    const newBlog = {
      name,
      description,
      thumbnail,
      contents,
      cost,
      duration,
      author: req.user.id,
      itinerary,
    };

    const newBlogCreated = await Blog.create(newBlog);
    res.json({ blogId: newBlogCreated._id });
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/weights/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const { weight } = req.body;
    await updateWeight(blogId, req.user.id, weight);
    res.status(200).send();
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
    else {
      blog.likes.push(userId);
      await updateWeight(blog._id, req.user.id, 0.7);
    }

    await blog.save();
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.put("/:blogId", async (req, res) => {
  try {
    const { name, description, thumbnail, cost, duration, contents } = req.body;
    await Blog.findOneAndUpdate(
      { _id: req.params.blogId, author: req.user.id },
      {
        name,
        description,
        thumbnail,
        cost,
        duration,
        contents,
        blogUpdatedAt: new Date(),
      }
    );
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/:blogId", async (req, res) => {
  try {
    await Blog.findOneAndRemove({
      _id: req.params.blogId,
      author: req.user.id,
    });
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
