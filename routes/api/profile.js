const express = require("express");

module.exports = (app, controller) => {
  const router = express.Router();

  app.use("/api/profile", router);

  router.get("/", controller.index);
};
