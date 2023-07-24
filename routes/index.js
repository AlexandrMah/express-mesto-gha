const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use((req, res, next) => {
  req.user = {
    _id: '64be712bdb1a8c0a88427bc7'
  };

  next();
});

router.use('/users', userRouter);
router.use('/cards', cardRouter);



router.use((req, res) => {
  res.status(404).send({ message: `Ресурс по адресу ${req.path} не найден`});
})

module.exports = router;