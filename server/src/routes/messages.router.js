const MessageController = require("../controllers/messages.controller");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const express = require("express");
const router = express.Router();

router.post("/", verifyAccessToken, MessageController.createMessage);
router.get("/:chatId", verifyAccessToken, MessageController.getMessages);

module.exports = router;
