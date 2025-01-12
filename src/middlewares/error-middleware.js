const HttpError = require('../errors/HTTPError');

module.exports = (error, req, res, next) => {
  if (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }

  next();
};
