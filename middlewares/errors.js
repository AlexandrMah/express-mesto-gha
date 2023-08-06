const error = (err, req, res, next) => {
  console.log(err);
  if (err === 400) {
    res.status(400).send({ message: 'Введен некорректный id' });
  }

  if (err === 404) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }


  next();
};

module.exports = { error };
