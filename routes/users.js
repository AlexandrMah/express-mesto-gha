const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
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

router.patch('/me', celebrate({
  params: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), changeProfile);

router.patch('/me/avatar', changeAvatar);

router.use(errors());

module.exports = router;
