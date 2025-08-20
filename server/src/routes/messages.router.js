const MessageController = require("../controllers/messages.controller");
const express = require("express");
const router = express.Router();

router.post("/", MessageController.createMessage);
router.get("/:chatId", MessageController.getMessages);

module.exports = router;
