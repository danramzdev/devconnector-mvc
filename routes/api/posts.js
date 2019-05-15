const express = require("express");

module.exports = (app, controller) => {
  const router = express.Router();

  app.use("/api/posts", router);

  router.get("/", controller.index);
};
