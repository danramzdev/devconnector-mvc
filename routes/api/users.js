const express = require("express");

module.exports = (app, controller) => {
  const router = express.Router();

  app.use("/users", router);

  router.get("/", controller.index);
};
