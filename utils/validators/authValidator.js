const { check } = require("express-validator/check");

module.exports = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password required").exists()
];
