const express = require("express");

module.exports = (app, controller) => {
  const router = express.Router();

  app.use("/posts", router);

  router.get("/", controller.index);
};
