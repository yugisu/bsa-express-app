import { Router } from 'express';
import {
  getUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser,
} from '../repositories';

const router = Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  getUsers((data) => res.send(data));
});

/* GET user by id */
router.get('/:id', (req, res, next) => {
  const userId = req.params.id;

  getUserById(userId, (data) => res.send(data));
});

/* POST new user */
router.post('/', (req, res, next) => {
  addUser(req.body, (data) => res.send(data));
});

router.put('/:id', (req, res, next) => {
  const userId = req.params.id;

  editUser(userId, req.body, (data) => res.send(data));
});

router.delete('/:id', (req, res, next) => {
  const userId = req.params.id;

  deleteUser(userId, (data) => res.send(data));
});

export const usersRouter = router;
