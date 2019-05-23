import { Router } from 'express';

const indexRouter = Router();

/* GET home page. */
indexRouter.get('/', (req, res, next) => {
  res.send('Welcome to Express!');
});

export { indexRouter };
