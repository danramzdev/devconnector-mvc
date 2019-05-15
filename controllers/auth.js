const User = require("../models/User");

class AuthController {
  static async index(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-password");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
}

module.exports = AuthController;
