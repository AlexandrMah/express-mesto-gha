const User = require('../models/user');

function getUsers(req, res) {
  return User.find({})
    .then(users => res.status(200).send(users))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

function getUser(req, res) {
  const id = req.params.userId;
  return User.findById(id).then(user => {
    if(!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }

    res.status(200).send(user);
  })
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

function createUser(req, res) {
  return User.create({ ...req.body }).then(user => {
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

function changeProfile(req, res) {
  const id = req.params.userId;
  const { name, about } = req.body;
  return User.findByIdAndUpdate(id, { name, about }).then(user => {
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

function changeAvatar(req, res) {
  const id = req.params.userId;
  const { avatar } = req.body;
  return User.findByIdAndUpdate(id, { avatar }).then(user => {
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  changeProfile,
  changeAvatar
}