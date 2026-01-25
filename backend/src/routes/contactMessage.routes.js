const express = require("express");
const router = express.Router();

const {
  createMessage,
  getMessages,
  getMessageById,
  deleteMessage,
} = require("../controllers/contactMessage.controller");

router.post("/", createMessage);       // submit form
router.get("/", getMessages);          // admin list
router.get("/:id", getMessageById);    // single
router.delete("/:id", deleteMessage);  // admin delete

module.exports = router;
