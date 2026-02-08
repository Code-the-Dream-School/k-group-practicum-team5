const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin")


const {
  createMessage,
  getMessages,
  getMessageById,
  deleteMessage,
} = require("../controllers/contactMessage.controller");

router.post("/", createMessage);       // submit form
router.get("/", admin, getMessages);          // admin list
router.get("/:id", getMessageById);    // single
router.delete("/:id", admin, deleteMessage);  // admin delete

module.exports = router;
