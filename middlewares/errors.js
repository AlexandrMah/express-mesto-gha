const error = (err, req, res, next) => {
  console.log(err);
  if (err === 400) {
    res.status(400).send({ message: 'Введены некорректные данные' });
  }

  if (err === 401) {
    res.status(401).send({ message: 'Неправильные почта или пароль' });
  }

  if (err === 404) {
    res.status(404).send({ message: 'Нет такого id' });
  }

  if (err === 409) {
    res.status(409).send({ message: 'Такая почта уже есть' });
  }

  res.status(500).send({ message: 'Произошла ошибка' });

  next();
};

module.exports = { error };
