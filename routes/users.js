const router = require('express').Router();
const {
  getUsers, getUser, changeProfile, userInfo, changeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', userInfo);

router.get('/:userId', getUser);

router.patch('/me', changeProfile);

router.patch('/me/avatar', changeAvatar);

module.exports = router;
