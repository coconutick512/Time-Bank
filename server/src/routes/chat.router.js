const ChatController = require("../controllers/chat.controller");
const express = require("express");
const router = express.Router();

router.post("/", ChatController.createChat);
router.get("/:id", ChatController.getChats);

module.exports = router;
