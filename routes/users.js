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
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), changeProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9\-._~:/?#[\]@!$&'()*+.;=]*)$/,
    ),
  }),
}), changeAvatar);

router.use(errors());

module.exports = router;
