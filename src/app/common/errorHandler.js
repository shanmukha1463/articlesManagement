const httpStatus = require("http-status");

const errorHandler = (error, request, response, next) => {
  response
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({ error: { message: error.message, stack: error.stack } });
  next();
};

module.exports = {
  errorHandler,
};
