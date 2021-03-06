const express = require("express");
const auth = require("../../utils/middleware/auth");
const profileValidator = require("../../utils/validators/profileValidator");
const experienceValidator = require("../../utils/validators/experienceValidator");
const educationValidator = require("../../utils/validators/educationValidator");

module.exports = (app, controller) => {
  const router = express.Router();

  app.use("/api/profile", router);

  router.get("/me", auth, controller.index);
  router.post("/", auth, profileValidator, controller.create);
  router.get("/", controller.getAllProfiles);
  router.get("/user/:user_id", controller.getProfileById);
  router.delete("/", auth, controller.delete);
  router.put("/experience", auth, experienceValidator, controller.experience);
  router.delete("/experience/:exp_id", auth, controller.deleteExperience);
  router.put("/education", auth, educationValidator, controller.education);
  router.delete("/education/:edu_id", auth, controller.deleteEducation);
  router.get("/github/:username", controller.github);
};
