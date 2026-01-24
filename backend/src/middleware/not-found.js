const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const notFound = (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ success: false, msg: ReasonPhrases.NOT_FOUND });
};

module.exports = notFound;