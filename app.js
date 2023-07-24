const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

//app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64be712bdb1a8c0a88427bc7'
  };

  next();
});

app.use(routes)

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