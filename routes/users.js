const router = require('express').Router();
const {
  getUsers, getUser, createUser, changeProfile, userInfo, changeAvatar, login
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.post('/signin', login);

router.post('/signup', createUser);

router.get('/', auth, getUsers);

router.get('/me', auth, userInfo);

router.get('/:userId', auth, getUser);

router.patch('/me', auth, changeProfile);

router.patch('/me/avatar', auth, changeAvatar);



module.exports = router;
