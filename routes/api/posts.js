const express = require("express");
const auth = require("../../utils/middleware/auth");
const postValidator = require("../../utils/validators/postValidator");

module.exports = (app, controller) => {
  const router = express.Router();

  app.use("/api/posts", router);

  router.post("/", auth, postValidator, controller.create);
  router.get("/", auth, controller.getAll);
  router.get("/:id", auth, controller.getById);
  router.delete("/:id", auth, controller.delete);
  router.put("/like/:id", auth, controller.like);
};
