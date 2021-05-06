import express from "express";
import Comment from "../../models/Comment.js";
import User from "../../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find({ _id: { $in: req.blog.comments } });
    const commentsUsername = await User.find(
      {
        _id: { $in: comments.map((comment) => comment.author) },
      },
      { username: 1, _id: 0 }
    );

    res.json(
      comments.map((comment, index) => ({
        ...comment._doc,
        author: commentsUsername[index].username,
      }))
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.create({ text, author: req.user.id });

    req.blog.comments.push(comment.id);
    await req.blog.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.put("/:commentId", async (req, res) => {
  try {
    const { text } = req.body;
    await Comment.findByIdAndUpdate(req.params.commentId, {
      text,
    });
    res.send();
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.delete("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.commentId);
    req.blog.comments.pull(comment.id);
    await req.blog.save();
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

export default router;
