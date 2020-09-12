const { check } = require("express-validator");

module.exports = [
  check("status", "Status is required")
    .not()
    .isEmpty(),
  check("skills", "Skills required")
    .not()
    .isEmpty(),
];
