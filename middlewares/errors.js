const error = (err, req, res, next) => {
  res.status(err.statusCode).json({ error: err.message });
  /*if (err instanceof Bad_request) {
    res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof 401) {
    res.status(401).json({ error: err.message });
  }

  if (err instanceof 'Unauthorized') {
    res.status(401).json({ error: err.message });
  }

  if (err instanceof Forbidden) {
    res.status(err.statusCode).json({ error: err.message });
  }

  // if (err instanceof 404) {
  //   res.status(404).json({ error: err.message });
  // }

  if (err instanceof NotFount) {
    res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof 409) {
    res.status(409).json({ error: err.message });
  }

  // if (err === 400) {
  //   res.status(400).send({ message: 'Введены некорректные данные' });
  // }

  // if (err === 401) {
  //   res.status(401).send({ message: 'Неправильные почта или пароль' });
  // }

  // if (err === 'Unauthorized') {
  //   res.status(401).send({ message: 'Необходима авторизация' });
  // }

  // if (err === 403) {
  //   res.status(403).send({ message: 'Недостаточно прав для удаления этой карточки' });
  // }

  // if (err === 404) {
  //   res.status(404).send({ message: 'Нет такого id' });
  // }

  // if (err === 'Not Fount') {
  //   res.status(404).send({ message: 'Нет такого адреса' });
  // }

  // if (err === 409) {
  //   res.status(409).send({ message: 'Такая почта уже есть' });
  // }

  res.status(500).send({ message: 'Произошла ошибка' });*/

  next();
};

module.exports = { error };
