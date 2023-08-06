const error = (err, req, res, next) => {

  console.log(err);
  if (err === 404){
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }

  // if (){
  //   res.send({ message: err.message});
  // };




  next();
};

module.exports = { error };