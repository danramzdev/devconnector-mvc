const { validationResult } = require("express-validator/check");
const request = require("request");
const config = require("config");

// Models
const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");

class ProfileController {
  static async index(req, res) {
    try {
      const profile = await Profile.findOne({ userId: req.user.id }).populate(
        "user",
        ["name", "avatar"]
      );

      if (!profile) {
        return res
          .status(400)
          .json({ msg: "There is no profile for this user" });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};

    try {
      profileFields.userId = req.user.id;
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;
      if (skills) {
        profileFields.skills = skills.split(",").map(skill => skill.trim());
      }

      // Build social object
      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;
      let profile = await Profile.findOne({ userId: req.user.id });

      // If exists update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { userId: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create new profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }

    res.send(profileFields);
  }

  static async getAllProfiles(req, res) {
    try {
      const profiles = await Profile.find().populate("userId", [
        "name",
        "avatar"
      ]);

      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async getProfileById(req, res) {
    try {
      const profile = await Profile.findOne({
        userId: req.params.user_id
      }).populate("userId", ["name", "avatar"]);

      if (!profile) {
        return res.status(400).json({ msg: "Profile not found" });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);

      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "Profile not found" });
      }
      res.status(500).send("Server Error");
    }
  }

  static async delete(req, res) {
    try {
      // Remove user posts
      await Post.deleteMany({ userId: req.user.id });
      // Remove Profile
      await Profile.findOneAndRemove({ userId: req.user.id });
      // remove User
      await User.findOneAndRemove({ _id: req.user.id });

      res.json({ msg: "User deleted" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async experience(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ userId: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async deleteExperience(req, res) {
    try {
      const profile = await Profile.findOne({ userId: req.user.id });

      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async education(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ userId: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async deleteEducation(req, res) {
    try {
      const profile = await Profile.findOne({ userId: req.user.id });

      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async github(req, res) {
    try {
      const options = {
        uri: `https://api.github.com/users/${
          req.params.username
        }/repos?per_page=5&sort=created:asc&client_id=${config.get(
          "githubClientId"
        )}&client_secret=${config.get("githubSecret")}`,
        method: "GET",
        headers: { "user-agent": "node.js" }
      };

      request(options, (error, response, body) => {
        if (error) console.error(error);

        if (response.statusCode !== 200) {
          return res.status(404).json({ msg: "No github profile found" });
        }

        res.json(JSON.parse(body));
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
}

module.exports = ProfileController;
