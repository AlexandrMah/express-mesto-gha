const { BadRequestError, UnauthorizedError, ForbiddenError, NotFountError, ConflictError } = require('../utils/constants');

const error = (err, req, res, next) => {
  console.log('ошибка: ',err);
  if (err instanceof BadRequestError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ForbiddenError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof NotFountError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ConflictError) {
    res.status(409).json({ message: err.message });
  }

  res.status(500).send({ message: 'Произошла ошибка' });

  next();
};

module.exports = { error };
