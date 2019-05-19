const express = require("express");
const auth = require("../../utils/middleware/auth");

module.exports = (app, controller) => {
  const router = express.Router();

  app.use("/api/profile", router);

  router.get("/me", auth, controller.index);
};
