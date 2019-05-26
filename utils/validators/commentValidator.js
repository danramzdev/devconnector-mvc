const { check } = require("express-validator/check");

module.exports = [
  check("text", "Text is required")
    .not()
    .isEmpty()
];
