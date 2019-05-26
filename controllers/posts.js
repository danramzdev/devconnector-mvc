const { validationResult } = require("express-validator/check");

const Post = require("../models/Post");
const Profile = require("../models/Profile");
const User = require("../models/User");

class PostsController {
  static async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        userId: user.id
      };

      const post = new Post(newPost);
      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async getAll(req, res) {
    try {
      const posts = await Post.find().sort({ date: -1 });

      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async getById(req, res) {
    try {
      const post = await Post.findById(req.params.id).sort({ date: -1 });

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      res.json(post);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("Server Error");
    }
  }

  static async delete(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      // Check user
      if (post.userId.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      console.log(post.userId);
      console.log(req.user.id);

      await post.remove();

      res.json({ msg: "Post deleted" });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("Server Error");
    }
  }

  static async like(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      // Check if like already exists
      if (post.likes.filter(like => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: "Post already liked" });
      }

      post.likes.unshift({ user: req.user.id });

      await post.save();

      res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
}

module.exports = PostsController;
