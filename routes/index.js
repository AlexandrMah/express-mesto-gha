const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const userRouter = require('./users');
const cardRouter = require('./cards');
const {
  createUser, login,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { error } = require('../middlewares/errors');
const { NotFoundError } = require('../utils/constants');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9\-._~:/?#[\]@!$&'()*+.;=]*)$/,
    ),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Нет такого адреса'))
});

router.use(errors());

router.use(error);

module.exports = router;
