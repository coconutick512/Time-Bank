const UserSkillsController = require("../controllers/user.skills.controller");

const skillRouter = require("express").Router();

skillRouter.get("/:id", UserSkillsController.getUserWithSkills());
skillRouter.get("/", UserSkillsController.getAllUsersWithSkills());

module.exports = skillRouter;
