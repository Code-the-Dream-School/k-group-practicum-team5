const CustomAPIError = require('./CustomAPIError');
const BadRequestError = require('./BadRequestError');
const UnauthenticatedError = require('./UnauthenticatedError');
const NotFoundError = require('./NotFoundError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  ForbiddenError,
};