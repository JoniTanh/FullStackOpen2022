const User = require("../models/user");
const logger = require("./logger");
const jwt = require("jsonwebtoken");

const errorHandler = (error, request, response, next) => {
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }

  logger.error(error.message);

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;

  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    request.user = user;
  }

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
