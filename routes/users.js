const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, changeProfile, userInfo, changeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', userInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().regex(/^[a-f\d]{24}$/i).required(),
  }),
}), getUser);

router.patch('/me', changeProfile);

router.patch('/me/avatar', changeAvatar);

module.exports = router;
