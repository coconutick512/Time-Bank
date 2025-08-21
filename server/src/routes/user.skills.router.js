const UserSkillsController = require("../controllers/user.skills.controller");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const skillRouter = require("express").Router();

skillRouter.get("/:id", verifyAccessToken, UserSkillsController.getUserWithSkills);
skillRouter.get("/", verifyAccessToken, UserSkillsController.getAllUsersWithSkills);

module.exports = skillRouter;
