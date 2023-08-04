const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/user');

function getUsers(req, res) {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function getUser(req, res) {
  const id = req.params.userId;
  return User.findById(id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Введен некорректный id' });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const newEmail = await User.findOne({ email });
    console.log('111', !newEmail);
    if (newEmail) {
      res.status(409).send({ message: `${email} 'Такая почта уже есть'` });
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hash, ...req.body });
    res.status(201).send({
      _id: user._id, name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    });
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

function changeProfile(req, res) {
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
        res.status(404).send({ message: 'Пользователь с данным id не найден' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function changeAvatar(req, res) {
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
        res.status(404).send({ message: 'Пользователь с данным id не найден' });
        return;
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

    const payload = { id: user._id };

    const token = JWT.sign(payload, 'some-secret-key', { expiresIn: '7d' });
    console.log(token);

    res.cookie('jwt', token);
    res.status(200).send(payload);
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

const userInfo = (req, res) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
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
