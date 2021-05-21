import express from "express";
import Comment from "../../models/Comment.js";
import User from "../../models/User.js";
import {
  getSentiment,
  updateWeight,
} from "../../recommender/blogs/utilities.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find({
      _id: { $in: req.blog.comments },
    }).sort({
      createdAt: -1,
    });
    const commentsUsername = await User.find(
      {
        _id: { $in: comments.map((comment) => comment.author) },
      },
      { username: 1, _id: 1 }
    );

    res.json(
      comments.map((comment) => ({
        ...comment._doc,
        author: commentsUsername.find(
          (user) => String(user._id) === String(comment.author)
        ),
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

    const commentSentimentScore = await getSentiment(text);
    await updateWeight(req.blog._id, req.user.id, commentSentimentScore.weight);

    req.blog.comments = [comment.id, ...req.blog.comments];
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
    req.blog.comments.pull(comment._id);
    await req.blog.save();
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

export default router;
