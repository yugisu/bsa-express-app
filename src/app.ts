import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { indexRouter, usersRouter } from './routes';

const app = express();

// Defining middlewares & stuff
app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser());

// Defining routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
