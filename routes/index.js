const router = require('express').Router();
const { celebrate, Joi, errors  } = require('celebrate');

const userRouter = require('./users');
const cardRouter = require('./cards');
const {
  createUser, login,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

router.use(errors());

router.post('/signin', login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res) => {
  res.status(404).send({ message: `Ресурс по адресу ${req.path} не найден` });
});

router.use((err, req, res, next) => {
  // это обработчик ошибки
});

module.exports = router;
