const mongoose = require('mongoose');
//require('mongoose-type-url');

const cardSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  link: {
    type: String,
    required: true,
    work: mongoose.SchemaTypes.Url,
    profile: mongoose.SchemaTypes.Url,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
  versionKey: false,
});

module.exports = mongoose.model('card', cardSchema);
