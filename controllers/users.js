const User = require('../models/user');

function getUsers(req, res) {
  return User.find({})
    .then(users => res.status(200).send(users))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

function getUser(req, res) {
  const id = req.params.userId;
  return User.findById(id)
    .orFail(new Error('NotValidId'))
    .then(user => {
      res.status(200).send(user);
    })
    .catch (err=> {
      if(err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      if (err.kind === "ObjectId"){
        return res.status(400).send({ message: 'Введен некорректный id' });
      }

      res.status(500).send({ message: 'Произошла ошибка' })});
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

// const changeProfile = async (req, res) => {
//   try{
//     const id = req.user._id;
//     const { name, about } = req.body;
//     const user = await User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
//     res.status(200).send(user)
//   }
//   catch(err) {
//     if (err.name === 'ValidationError') {
//       res.status(400).send({
//         message: `${Object.values(err.errors)
//         .map(error => error.message)
//       .join(', ')}`,
//       });
//       return;
//     }
//     if (err.massage === 'ValidationError') {
//       res.status(404).send({
//         message: `Пользователь с данным id не найден` });
//       return;
//     }
//     res.status(500).send({ message: 'Произошла ошибка' });
//   };
// }

function changeProfile(req, res) {
  const id = req.user._id;
  const { name, about } = req.body;
  return User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then(user => {
      res.status(200).send(user)
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
      if (err.massage === 'NotValidId') {
        res.status(404).send({
          message: `Пользователь с данным id не найден` });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function changeAvatar(req, res) {
  const id = req.user._id;
  const { avatar } = req.body;
  return User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true }).then(user => {
    res.status(200).send(user);
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
    if (err.massage === 'ValidationError') {
      res.status(404).send({
        message: `Пользователь с данным id не найден` });
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