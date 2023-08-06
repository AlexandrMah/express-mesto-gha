const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/user');

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
}

function getUser(req, res, next) {
  const id = req.params.userId;
  return User.findById(id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        const error = 404;
        next(error);
      }
      if (err.kind === 'ObjectId') {
        const error = 400;
        next(error);
      }
      next(err);
    });
}

const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const newEmail = await User.findOne({ email });
    if (newEmail) {
      const error = 409;
      next(error);
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, ...req.body, password: hash });
    res.status(201).send({
      _id: user._id, name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const error = 400;
      next(error);
    }
    next(err);
  }
};

function changeProfile(req, res, next) {
  const id = req.user._id;
  const { name, about } = req.body;
  return User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
        return;
      }
      if (err.massage === 'NotValidId') {
        const error = 404;
        next(error);
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function changeAvatar(req, res, next) {
  const id = req.user._id;
  const { avatar } = req.body;
  return User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
        return;
      }
      if (err.massage === 'NotValidId') {
        const error = 404;
        next(error);
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).send({ message: `${email} 'Неправильные почта или пароль'` });
      return;
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      res.status(401).send({ message: 'Введен неправильный логин или пароль!2' });
      return;
    }

    const payload = { _id: user._id };

    const token = JWT.sign(payload, 'some-secret-key', { expiresIn: '7d' });

    res.cookie('JWT', token);
    res.status(200).json(token);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: `${Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')}`,
      });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

const userInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        const error = 404;
        next(error);
      }
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Введен некорректный id' });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  userInfo,
  changeProfile,
  changeAvatar,
  login,
};
