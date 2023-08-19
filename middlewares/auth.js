const JWT = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/constants');

const auth = (req, res, next) => {
  const tokenKey = req.headers.cookie;

  if (!tokenKey) {
    //const error = 'Unauthorized';
    next(new UnauthorizedError('Необходима авторизация'));
    // res.status(401).send({ message: 'Необходима авторизация' });
    return;
  }

  const token = tokenKey.slice(4);

  let payload;
  try {
    payload = JWT.verify(token, 'some-secret-key');
  } catch (err) {
    //const error = 'Unauthorized';
    next(new UnauthorizedError('Необходима авторизация'));
    // res.status(401).send({ message: 'Необходима авторизация' });
    return;
  }

  req.user = payload;

  next();
};

module.exports = { auth };
