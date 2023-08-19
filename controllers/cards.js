const Card = require('../models/card');
const { BadRequestError, ForbiddenError, NotFountError } = require('../utils/constants');

function getCards(req, res, next) {
  return Card.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
}

function createCard(req, res, next) {
  const id = req.user._id;
  return Card.create({ ...req.body, owner: id }).then((user) => {
    res.status(201).send(user);
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
        return;
      }
      next(err);
    });
}

function deleteCard(req, res, next) {
  const id = req.params.cardId;
  const userId = req.user._id;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        // const error = 404;
        // const err = new NotFount('Нет такого id');
        // err.statusCode = 404;
        next(new NotFountError('Нет такого id'));
        return;
      }

      if (userId !== card.owner.toString()) {
        // const error = 403;
        // const err = new Forbidden('Недостаточно прав для удаления этой карточки');
        // err.statusCode = 403;
        next(new ForbiddenError('Недостаточно прав для удаления этой карточки'));
        return;
      }

      return Card.deleteOne({ _id: id })
        .then(() => {
          res.status(200).send({ message: 'Карточка удалена успешно' });
        });
    })
    .catch((err) => next(err));
}

function likeCard(req, res, next) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => {
    if (!card) {
      // const error = 404;
      next(new NotFountError('Нет такого id'));
      return;
    }
    res.status(200).send({ message: 'Лайк поставлен успешно' });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        // const error = 400;
        next(new BadRequestError('Введены некорректные данные'));
        return;
      }
      next(err);
    });
}

function dislikeCard(req, res, next) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((user) => {
    if (!user) {
      // const error = 404;
      next(new NotFountError('Нет такого id'));
      return;
    }
    res.status(200).send({ message: 'Лайк снаят успешно' });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        // const error = 400;
        next(new BadRequestError('Введены некорректные данные'));
        return;
      }
      next(err);
    });
}

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
