const express = require("express");
const auth = require("../../utils/middleware/auth");
const authValidator = require("../../utils/validators/authValidator");

module.exports = (app, controller) => {
  const router = express.Router();

  app.use("/api/auth", router);

  router.get("/", auth, controller.getAuthUser);
  router.post("/", authValidator, controller.login);
};
