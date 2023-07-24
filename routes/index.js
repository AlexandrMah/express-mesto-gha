const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use((req, res, next) => {
  req.user = {
    _id: '64be6d668598702364364a48' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

router.use('/users', userRouter);
router.use('/cards', cardRouter);



router.use((req, res) => {
  res.status(404).send({ message: `Ресурс по адресу ${req.path} не найден`});
})

module.exports = router;