const SkillsController = require('../controllers/skills.controller');

const skillsRouter = require('express').Router();

skillsRouter.get('/', SkillsController.getAllSkills);
skillsRouter.get('/:id', SkillsController.getSkillById);

module.exports = skillsRouter;
