const express = require("express");
const auth = require("../../utils/middleware/auth");
const profileValidator = require("../../utils/validators/profileValidator");

module.exports = (app, controller) => {
  const router = express.Router();

  app.use("/api/profile", router);

  router.get("/me", auth, controller.index);
  router.post("/", auth, profileValidator, controller.create);
  router.get("/", controller.getAllProfiles);
  router.get("/user/:user_id", controller.getProfileById);
  router.delete("/", auth, controller.delete);
};
