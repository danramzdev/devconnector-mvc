const { check } = require("express-validator");

module.exports = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password required").exists(),
];
