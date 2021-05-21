import User from "../../models/User.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { checkForAuthentication } from "./auth.middleware.js";
import { initializeUserProfile } from "../../recommender/hotels/utilities.js";
import { updateInterestVector } from "../../recommender/hotels/recommender.js";
import { updatePOIcategories } from "../../recommender/places/utilities.js";
import { updateBlogInterest } from "../../recommender/blogs/utilities.js";

const router = express.Router();

// @route  POST /users/register
// @desc   Register a user
// @access Public
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !email || !password)
    return res.status(400).send({ msg: "Please enter all fields." });

  // Check for existing user
  User.findOne({ username })
    .then((user) => {
      if (user)
        return res
          .status(400)
          .send({ msg: "User with the same username already exists." });

      const newUser = new User({ username, email, password });

      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => {
          newUser.password = hash;
          return newUser.save();
        })
        .then((savedUser) => {
          jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1h",
            },
            (err, token) => {
              if (err) return res.status(500).json({ error: err.message });

              initializeUserProfile(savedUser._id);
              res.json({
                token,
                user: {
                  id: savedUser._id,
                  username: savedUser.username,
                  email: savedUser.email,
                },
              });
            }
          );
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// @route  POST /users/login
// @desc   Login a user
// @access Public
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res.status(400).send({ msg: "Please enter all fields." });

  // Check for existing user
  User.findOne({ username })
    .then((user) => {
      if (!user) return res.status(400).send({ msg: "User does not exist." });

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials." });

          jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1h",
            },
            (err, token) => {
              if (err) return res.status(500).json({ error: err.message });

              // Update user's interest vectors everytime before login
              updateInterestVector(user._id);
              updatePOIcategories(user._id);
              updateBlogInterest(user._id);

              res.json({
                token,
                user: {
                  id: user._id,
                  username: user.username,
                  email: user.email,
                },
              });
            }
          );
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// @route  GET /
// @desc   Get user data
// @access Public
router.get("/", checkForAuthentication, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

export default router;
