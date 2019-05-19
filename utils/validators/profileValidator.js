const { check } = require("express-validator/check");

module.exports = [
  check("status", "Status is required")
    .not()
    .isEmpty(),
  check("skills", "Skills required")
    .not()
    .isEmpty()
];
