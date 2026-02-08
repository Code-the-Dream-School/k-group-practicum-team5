const ContactMessage = require("../models/ContactMessage");
const {BadRequestError }= require('../errors/BadRequestError')
const {StatusCodes}= require("http-status-codes")
const {NotFoundError}= require('../errors/NotFoundError')

// CREATE message
exports.createMessage = async (req, res) => {
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
exports.getMessages = async (req, res) => {
    const messages = await ContactMessage.find()
      .sort({ created_at: -1 }); // newest first

    res.status(StatusCodes.OK).json(messages);
  } 
exports.getMessageById = async (req, res) => {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      throw new NotFoundError( "Message not found" );
    }
    res.status(StatusCodes.OK).json(message)
};
exports.deleteMessage = async (req, res) => {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!deleted) {
      throw new NotFoundError( "Message not found" );
    }

    res.status(StatusCodes.OK).json({ message: "Message deleted successfully" });
  }
  
