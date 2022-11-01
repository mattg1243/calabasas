import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'reflect-metadata';
// routes
import authRouter from './routes/auth.routes';
import { AppDataSource } from './database/dataSource';
import cors from 'cors';
import AppError from './utils/AppError';

const app = express();

// connect to DB
AppDataSource.initialize().then(async () => {
  const PORT = process.env.PORT || 3001;

  // view engine setup
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.resolve(__dirname, '../client/build')));
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
  });

  // app.use('/', indexRouter);
  // app.use('/users', usersRouter);
  // render react build
  app.use('/api/auth', authRouter);
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
  });

  // error handler
  app.use((err: AppError, req: Request, res: Response) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
    });
    res.render('error');
  });

  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`);
  });
});

module.exports = app;
