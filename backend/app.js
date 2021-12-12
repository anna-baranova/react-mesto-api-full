const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { createUser, login, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const serverError = require('./middlewares/serverError');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());

app.use(cors({
  origin: [
    'https://mestoproject.nomoredomains.work',
    'http://mestoproject.nomoredomains.work',
    'http://localhost:3000',
  ],
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(express.json());
app.use(requestLogger); // подключаем логгер запросов

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .regex(/https?:\/\/(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{1,6}([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=\S]*)/),
    }),
  }),
  createUser,
);
app.get('/signout', logout);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);
app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(serverError); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
