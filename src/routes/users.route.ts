import { Router } from 'express';
import { getUsers, getUserById, addUser } from '../repositories';

const router = Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  getUsers((data) => res.send(data));
});

/* GET user by id */
router.get('/:id', function(req, res, next) {
  const userId = req.params.id;

  getUserById(userId, (data) => res.send(data));
});

/* POST new user */
router.post('/', function(req, res, next) {
  addUser(req.body, (data) => res.send(data));
});

export const usersRouter = router;
