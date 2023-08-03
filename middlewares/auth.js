const JWT = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    res.status(401).send({ message: 'Необходима авторизация'});
    return;
  }

  let payload;
  try{
    payload = JWT.verify(token, 'some-secret-key');
  } catch(err) {
      res.status(401).send({ message: 'Необходима авторизация'});
      return;
  }

  req.user = payload;

  next();
}

module.exports = { auth }