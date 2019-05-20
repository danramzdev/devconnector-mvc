const { check } = require("express-validator/check");

module.exports = [
  check("school", "School is required")
    .not()
    .isEmpty(),
  check("degree", "Degree is required")
    .not()
    .isEmpty(),
  check("fieldofstudy", "Field of study is required")
    .not()
    .isEmpty(),
  check("from", "From date is required")
    .not()
    .isEmpty()
]
