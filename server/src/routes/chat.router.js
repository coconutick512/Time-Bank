const ChatController = require("../controllers/chat.controller");
const express = require("express");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const router = express.Router();

router.post("/", verifyAccessToken, ChatController.createChat);
router.get("/:id", verifyAccessToken, ChatController.getChats);

module.exports = router;
