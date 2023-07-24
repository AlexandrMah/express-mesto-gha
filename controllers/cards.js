const Card = require('../models/card');
function getCards(req, res) {
  return Card.find({})
    .then(users => res.status(200).send(users))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

function createCard(req, res) {
  const id = req.user._id;
  return Card.create({ ...req.body, owner: id }).then(user => {
    res.status(201).send(user);
  })
  .catch(err => {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: `${Object.values(err.errors)
        .map(error => error.message)
      .join(', ')}`,
      });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  });
}

function deleteCard(req, res) {
  const id = req.params.cardId;
  return Card.findByIdAndRemove(id)
    .then(user => {
      if(!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.status(200).send({ message: 'Удаление прошло успешно' });
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: `Переданы некорректные данные`,
        });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    })
}

function likeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then(card => {
    if(!card) {
      return res.status(404).send({ message: 'Нет карточки с таким id' });
    }

    res.status(200).send({ message: 'Лайк поставлен успешно' });
  })
  .catch(err => {
    if (err.name === 'CastError') {
      res.status(400).send({
        message: `Переданы некорректные данные`,
      });
      return;
    }
    res.status(500).send({ message: `Произошла ошибка` });
  });
}

function dislikeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then(user => {
    if(!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    res.status(200).send({ message: 'Лайк снаят успешно' });
  })
  .catch(err => {
    if (err.name === 'CastError') {
      res.status(400).send({
        message: `Переданы некорректные данные`,
      });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  });
}

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard
}