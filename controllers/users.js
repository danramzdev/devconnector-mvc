const { validationResult } = require("express-validator/check");

class UsersController {
  static register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("Users route /");
  }
}

module.exports = UsersController;
