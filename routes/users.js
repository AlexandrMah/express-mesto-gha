const router = require('express').Router();
const {
  getUsers, getUser, changeProfile, userInfo, changeAvatar,
} = require('../controllers/users');
const { celebrate, Joi, errors } = require('celebrate');

router.get('/', getUsers);

router.get('/me', userInfo);

router.get('/:userId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
  }),
}), getUser);

router.patch('/me', changeProfile);

router.patch('/me/avatar', changeAvatar);

module.exports = router;
