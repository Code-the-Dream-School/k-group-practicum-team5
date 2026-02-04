const ContactMessage = require("../models/ContactMessage");
const {BadRequestError }= require('../errors/BadRequestError')
const {StatusCodes}= require("http-status-codes")


// CREATE message
exports.createMessage = async (req, res) => {
  try {
    const { name, email, category, message } = req.body;
    
    if (!name || !email || !message) {
      throw new BadRequestError("Missing required fields");
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      category,
      message,
    });

    res.status(StatusCodes.CREATED).json({
      message: "Message sent successfully",
      data: newMessage,
    });
    
  } 
  
  catch (err) {
    console.error(err)
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ created_at: -1 }); // newest first

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
exports.getMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch message" });
  }
};
exports.deleteMessage = async (req, res) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete message" });
  }
};