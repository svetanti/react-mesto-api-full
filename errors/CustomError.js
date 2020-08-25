class CustomError extends Error {
  constructor(status, message, ...rest) {
    super(...rest);
    this.status = status;
    this.message = message;
  }
}

module.exports = CustomError;
