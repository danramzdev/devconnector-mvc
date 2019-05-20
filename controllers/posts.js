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
      const user = await User.findById({ _id: req.user.id }).select(
        "-password"
      );

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
}

module.exports = PostsController;
