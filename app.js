const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

//app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());

app.use(routes)

app.use((req, res, next) => {
  req.user = {
    _id: '64bd175f64e8e727d22c4576' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false
  });

  app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
  });
}

main();