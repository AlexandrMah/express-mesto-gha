// const Bad_request = 400;
// const Unauthorized = 401;
// const Forbidden = 403;
// const Not_foud = 404;
// const Conflict = 409;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class NotFountError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = { BadRequestError, NotFountError, ConflictError };