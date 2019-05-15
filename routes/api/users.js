const express = require("express");
const usersValidator = require("../../utils/schemas/usersValidator");

module.exports = (app, controller) => {
  const router = express.Router();

  app.use("/api/users", router);

  router.post("/", usersValidator, controller.register);
};
