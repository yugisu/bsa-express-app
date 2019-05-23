import { Router } from 'express';

const usersRouter = Router();

/* GET users listing. */
usersRouter.get('/', (req, res, next) => {
  res.send('*list of users here*');
});

export { usersRouter };
