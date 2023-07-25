const router = require('express').Router();
const {
  getUsers, getUser, createUser, changeProfile, changeAvatar,
} = require('../controllers/users.js');

router.get('/', getUsers);

router.get('/:userId', getUser);

router.post('/', createUser);

router.patch('/me', changeProfile);

router.patch('/me/avatar', changeAvatar);

module.exports = router;
