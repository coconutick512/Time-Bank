const SadaService = require('../services/sada.js');

const skillRouter = require('express').Router();

skillRouter.get('/',SadaService.getUserWithSkills)

module.exports = skillRouter